import './globals.css'

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { CartProvider } from '@/providers/cart-provider'

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ignite Shop',
  description: 'Ignite Shop',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <CartProvider>
      <html lang="en">
        <body className={roboto.className}>{children}</body>
      </html>
    </CartProvider>
  )
}
