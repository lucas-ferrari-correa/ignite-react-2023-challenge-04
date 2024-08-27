import Image from 'next/image'
import Link from 'next/link'
import { redirect, RedirectType } from 'next/navigation'

import AppLayout from '@/layouts/_app'
import { getStripeCheckoutSession } from '@/services/get-stripe-checkout-session'

import { ImageContainer, SuccessContainer } from './styles'

type Props = {
  searchParams: Record<string, unknown>
}

export default async function Success({ searchParams }: Props) {
  const checkoutSessionId = searchParams.session_id as string | undefined
  if (!checkoutSessionId) {
    redirect('/', RedirectType.replace)
  }

  const session = await getStripeCheckoutSession({
    id: checkoutSessionId ?? '',
  })

  return (
    <AppLayout>
      <SuccessContainer>
        <h1 className="text-2xl text-title font-bold">Compra efetuada!</h1>

        <ImageContainer>
          <Image
            src={session?.product.imageUrl ?? ''}
            width={120}
            height={110}
            alt=""
          />
        </ImageContainer>

        <p className="text-xl text-text max-w-[560px] text-center mt-8 leading-[1.4]">
          Uhuul <strong>{session?.customerName}</strong>, sua{' '}
          <strong>{session?.product.name}</strong> já está a caminho da sua casa
        </p>

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
