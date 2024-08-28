'use client'

import { useRouter } from 'next/navigation'

import { useCart } from '@/providers/cart-provider'

import { ProductProps } from '../page'

type Props = {
  children: React.ReactNode
  product: ProductProps
}

export default function Button({ children, product }: Props) {
  const { addItem } = useCart()
  const router = useRouter()

  async function handleAddItem() {
    addItem({
      id: product.id,
      imageUrl: product.imageUrl,
      name: product.name,
      price: product.price,
      defaultPriceId: product.defaultPriceId,
      quantity: 1,
    })

    router.push('/')
  }

  return <button onClick={handleAddItem}>{children}</button>
}
