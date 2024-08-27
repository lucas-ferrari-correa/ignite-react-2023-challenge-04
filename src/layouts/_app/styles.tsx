import { X } from 'lucide-react'
import Image from 'next/image'

type Props = {
  children: React.ReactNode
}

type SidePanelProps = {
  isOpen: boolean
  items: Array<{
    imageUrl: string
    name: string
    price: number
  }>
}

export function Container({ children }: Props) {
  return (
    <div className="flex flex-col items-start min-h-[98vh] justify-center">
      {children}
    </div>
  )
}

export function Header({ children }: Props) {
  return (
    <header className="flex flex-row justify-between ml-auto mr-auto pt-8 pb-8 w-full max-w-[1180px] mt-0">
      {children}
    </header>
  )
}

export function SidePanel({ isOpen, items }: SidePanelProps) {
  return (
    <div
      className={`flex flex-col fixed top-0 right-0 h-full w-[500px] bg-elements shadow-2xl transition-transform transform z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <X />
      <h2 className="p-4 text-xl font-semibold border-b">Sacola de compras</h2>
      <div className="overflow-y-auto no-scrollbar">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-row justify-between p-2 border-b"
          >
            <Image src={item.imageUrl} alt="" />
            <div className="flex flex-col">
              <span>{item.name}</span>
              <span>{item.price}</span>
              <button>Remover</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
