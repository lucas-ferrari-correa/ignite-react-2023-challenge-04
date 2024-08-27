import Image from 'next/image'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import AppLayout from '@/layouts/_app'
import { getStripeProducts } from '@/services/get-stripe-products'

import { HomeContainer, Product } from './styles'

export default async function Home() {
  const products = await getStripeProducts()

  return (
    <AppLayout>
      <HomeContainer>
        <Carousel className="min-h-[656px]">
          <CarouselContent className="min-h-[656px]">
            {products.map((product) => {
              return (
                <CarouselItem
                  className="min-h-[656px] md:basis-2/3 lg:basis-1/3 pl-8"
                  key={product.id}
                >
                  <Product href={`/product/${product.id}`}>
                    <Image
                      src={product.imageUrl}
                      width={520}
                      height={480}
                      alt=""
                      className="object-cover"
                    />

                    <footer className="absolute bottom-1 left-1 right-1 rounded-[6px] flex items-center justify-between bg-black/[0.6] p-4">
                      <strong className="text-lg">{product.name}</strong>
                      <span className="text-xl font-bold text-light">
                        {product.price}
                      </span>
                    </footer>
                  </Product>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </HomeContainer>
    </AppLayout>
  )
}
