import Image from 'next/image'
import { redirect } from 'next/navigation'

import AppLayout from '@/layouts/_app'
import { getStripeProductById } from '@/services/get-stripe-product-by-id'
import { getStripeProducts } from '@/services/get-stripe-products'

import Button from './components/button'
import { ImageContainer, ProductContainer, ProductDetails } from './style'

export interface ProductProps {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string | null
  defaultPriceId: string
}

export default async function Product({
  params,
}: {
  params: { id: string | null }
}) {
  const productId = params.id

  const product = await getStripeProductById({ id: productId })

  if (!product) {
    redirect('/')
  }

  return (
    <AppLayout>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <Button product={product}>Compre aqui</Button>
        </ProductDetails>
      </ProductContainer>
    </AppLayout>
  )
}

export async function generateStaticParams() {
  const products = await getStripeProducts()

  return products.map((product) => ({
    id: product.id,
  }))
}
