'use server'

import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'

export async function getStripeProducts() {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  return response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format((price.unit_amount ?? 0) / 100),
    }
  })
}
