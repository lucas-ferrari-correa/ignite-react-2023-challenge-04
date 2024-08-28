import { NextRequest, NextResponse } from 'next/server'

import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const { products } = await req.json()
  if (!products?.length) {
    return NextResponse.json(
      {
        error: 'Products not found',
      },
      {
        status: 400,
      },
    )
  }

  const successUrl = `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_PUBLIC_URL}/`
  const lineItems = products.map(
    (product: { priceId: string; quantity: number }) => {
      return {
        price: product.priceId,
        quantity: product.quantity,
      }
    },
  )

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: lineItems,
  })

  return NextResponse.json(
    {
      checkoutUrl: checkoutSession.url,
    },
    {
      status: 201,
    },
  )
}
