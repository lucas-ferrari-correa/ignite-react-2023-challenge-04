'use client'

import axios from 'axios'
import { useState } from 'react'

import { ProductProps } from '../page'

type Props = {
  children: React.ReactNode
  product: ProductProps
}

export default function Button({ children, product }: Props) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
      {children}
    </button>
  )
}
