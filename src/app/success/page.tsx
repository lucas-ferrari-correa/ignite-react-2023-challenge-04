'use client'

import Image from 'next/image'
import Link from 'next/link'
import { redirect, RedirectType } from 'next/navigation'

import AppLayout from '@/layouts/_app'
import { useCart } from '@/providers/cart-provider'
import { getStripeCheckoutSession } from '@/services/get-stripe-checkout-session'

import { ImageContainer, SuccessContainer } from './styles'

type Props = {
  searchParams: Record<string, unknown>
}

export default async function Success({ searchParams }: Props) {
  const { clearCart } = useCart()

  const checkoutSessionId = searchParams.session_id as string | undefined
  if (!checkoutSessionId) {
    redirect('/', RedirectType.replace)
  }

  const session = await getStripeCheckoutSession({
    id: checkoutSessionId ?? '',
  })

  clearCart()

  return (
    <AppLayout>
      <SuccessContainer>
        <h1 className="text-2xl text-title font-bold">Compra efetuada!</h1>

        <div className="flex flex-row gap-8">
          {session?.products.map((product) => {
            const imageUrl = product.imageUrl

            return (
              <ImageContainer key={product.id}>
                <Image src={imageUrl ?? ''} width={120} height={110} alt="" />
              </ImageContainer>
            )
          })}
        </div>

        {session?.products.length === 1 ? (
          <p className="text-xl text-text max-w-[560px] text-center mt-8 leading-[1.4]">
            Uhuul <strong>{session?.customerName}</strong>, sua{' '}
            <strong>{session?.products[0].name}</strong> já está a caminho da
            sua casa
          </p>
        ) : (
          <p className="text-xl text-text max-w-[560px] text-center mt-8 leading-[1.4]">
            Uhuul <strong>{session?.customerName}</strong>, suas{' '}
            <strong>{session?.products.length} camisas</strong> já estão a
            caminho da sua casa
          </p>
        )}

        <Link
          className="block mt-20 text-lg text-principal hover:cursor-pointer hover:text-light"
          href={'/'}
        >
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </AppLayout>
  )
}
