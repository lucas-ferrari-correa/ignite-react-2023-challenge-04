import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'

type Props = {
  id: string | null
}

export const getStripeProductById = async ({ id }: Props) => {
  if (!id) {
    return
  }

  const product = await stripe.products.retrieve(id, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    price: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format((price.unit_amount ?? 0) / 100),
    description: product.description,
    defaultPriceId: price.id,
  }
}
