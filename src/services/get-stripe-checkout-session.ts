import Stripe from 'stripe'

import { stripe } from '@/lib/stripe'

type Props = {
  id: string | null
}

export const getStripeCheckoutSession = async ({ id }: Props) => {
  if (!id) {
    return
  }

  const session = await stripe.checkout.sessions.retrieve(id, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name
  const products = session.line_items?.data.map((d) => {
    return d.price?.product as Stripe.Product
  })

  return {
    customerName,
    products:
      products?.map((product) => {
        return {
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
        }
      }) ?? [],
  }
}
