'use client'

import { createContext, useContext, useState } from 'react'

type Props = {
  children: React.ReactNode
}

export interface CartItem {
  id: string
  quantity: number
  price: string
  imageUrl: string
  name: string
  defaultPriceId: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  itemsQuantity: () => number
  cartTotal: () => number
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: Props) {
  const [items, setItems] = useState<CartItem[]>([])

  function addItem(item: CartItem) {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
        )
      }

      return [...prevItems, item]
    })
  }

  function removeItem(id: string) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  function itemsQuantity() {
    return items.reduce((acc, ele) => {
      return acc + ele.quantity
    }, 0)
  }

  function cartTotal() {
    return items.reduce((acc, ele) => {
      return acc + Number(ele.price.replace(/[^0-9.-]+/g, ''))
    }, 0)
  }

  function clearCart() {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        itemsQuantity,
        cartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used in CartProvider')
  }
  return context
}
