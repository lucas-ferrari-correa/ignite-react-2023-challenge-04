import Link from 'next/link'

type Props = {
  children: React.ReactNode
}

type ProductProps = {
  href: string
} & Props

export function HomeContainer({ children }: Props) {
  return (
    <main className="flex gap-12 w-full carousel-max-width min-h-[656px]">
      {children}
    </main>
  )
}

export function Product({ children, href }: ProductProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="carousel-background-gradient rounded-[8px] p-1 cursor-pointer relative flex items-center justify-center min-h-[656px]"
    >
      {children}
    </Link>
  )
}
