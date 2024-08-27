type Props = {
  children: React.ReactNode
}

export function SuccessContainer({ children }: Props) {
  return (
    <main className="flex flex-col items-center justify-center my-0 mx-auto h-[656px]">
      {children}
    </main>
  )
}

export function ImageContainer({ children }: Props) {
  return (
    <div className="w-full max-w-[130px] h-[145px] product-background-gradient rounded-[8px] p-1 flex items-center justify-center mt-16">
      {children}
    </div>
  )
}
