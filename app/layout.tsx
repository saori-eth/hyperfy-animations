import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const font = Poppins({
  weight: '400',
  subsets: ['latin'],
})

export const viewport: Viewport = {
  themeColor: '#000000',
}

export const metadata: Metadata = {
  title: 'Hyperfy Animations',
  description: 'All Mixamo animations converted for use in Hyperfy',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Analytics />
      <body className={`${font.className} w-screen h-screen overflow-hidden`}>
        {children}
      </body>
    </html>
  )
}
