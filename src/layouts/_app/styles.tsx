'use client'

import axios from 'axios'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { CartItem, useCart } from '@/providers/cart-provider'

type Props = {
  children: React.ReactNode
}

type SidePanelProps = {
  isOpen: boolean
  items: CartItem[]
  close: () => void
}

export function Container({ children }: Props) {
  return (
    <div className="flex flex-col items-start min-h-[98vh] justify-center">
      {children}
    </div>
  )
}

export function Header({ children }: Props) {
  return (
    <header className="flex flex-row justify-between ml-auto mr-auto pt-8 pb-8 w-full max-w-[1180px] mt-0">
      {children}
    </header>
  )
}

function ImageContainer({ children }: Props) {
  return (
    <div className="w-full max-w-[93px] h-[102px] product-background-gradient rounded-[8px] p-1 flex items-center justify-center">
      {children}
    </div>
  )
}

export function SidePanel({ isOpen, close }: SidePanelProps) {
  const { removeItem, itemsQuantity, items, cartTotal } = useCart()

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const itemsSize = itemsQuantity()
  const itemsTotal = cartTotal()

  async function handleBuyProducts() {
    try {
      setIsCreatingCheckoutSession(true)

      const products = items.map((item) => {
        return {
          priceId: item.defaultPriceId,
          quantity: item.quantity,
        }
      })

      const response = await axios.post('/api/checkout', { products })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout')
    }
  }

  function handleRemoveItem(id: string) {
    removeItem(id)
  }

  return (
    <div
      className={`flex flex-col fixed top-0 right-0 h-full w-[600px] bg-elements shadow-2xl transition-transform transform z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <X className="m-2 hover:cursor-pointer" onClick={() => close()} />
      <div className="flex flex-col gap-4 w-[80%] h-[80%] mx-auto overflow-y-auto no-scrollbar">
        <h2 className="text-xl font-semibold">Sacola de compras</h2>
        <div className="flex flex-col gap-4">
          {items.map((item, index) => (
            <div key={index} className="flex flex-row gap-4">
              <ImageContainer>
                <Image src={item.imageUrl} width={120} height={110} alt="" />
              </ImageContainer>
              <div className="flex flex-col justify-between text-lg">
                <span className="font-thin">{item.name}</span>
                <span>{item.price}</span>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="bold text-principal hover:text-light w-0"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[80%] mx-auto mb-10 flex flex-col">
        <div className="flex flex-row justify-between mb-4 text-sm">
          <p>Quantidade</p>

          <span>
            {itemsSize} {itemsSize === 1 ? 'item' : 'itens'}
          </span>
        </div>

        <div className="flex flex-row justify-between">
          <p className="text-lg">Valor total</p>

          <span className="text-xl bold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format((itemsTotal ?? 0) / 100)}
          </span>
        </div>

        <Button
          onClick={handleBuyProducts}
          disabled={isCreatingCheckoutSession}
          className="text-xl mt-10 h-20 rounded-[8px] bg-principal hover:bg-light text-white"
        >
          Finalizar compra
        </Button>
      </div>
    </div>
  )
}
