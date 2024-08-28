'use client'

import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import logoImg from '@/assets/Logo.svg'
import { Button } from '@/components/ui/button'
import { useCart } from '@/providers/cart-provider'

import { Container, Header, SidePanel } from './styles'

type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { items } = useCart()

  const [isOpen, setIsOpen] = useState(false)

  function handleSidePanelIsOpen() {
    setIsOpen(!isOpen)
  }

  function handleSidePanelClose() {
    setIsOpen(false)
  }

  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
        <Button className="bg-elements" onClick={() => handleSidePanelIsOpen()}>
          <ShoppingBag className="text-text" />
        </Button>
      </Header>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10 z-40"
          onClick={handleSidePanelClose}
        />
      )}

      <SidePanel items={items} isOpen={isOpen} close={handleSidePanelClose} />

      {children}
    </Container>
  )
}
