type Props = {
  children: React.ReactNode
}

export function ProductContainer({ children }: Props) {
  return (
    <main className="grid grid-cols-2 items-stretch gap-16 max-w-[1180px] my-0 mx-auto">
      {children}
    </main>
  )
}

export function ImageContainer({ children }: Props) {
  return (
    <div className="w-full max-w-[576px] h-[656px] product-background-gradient rounded-[8px] p-1 flex items-center justify-center">
      {children}
    </div>
  )
}

export function ProductDetails({ children }: Props) {
  return <div className="flex flex-col product-details">{children}</div>
}
