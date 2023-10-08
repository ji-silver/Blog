import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import Provider from './Provider'
import { ImageProvider } from '@/context/ImageContext'


export const metadata: Metadata = {
  title: 'MY BLOG',
  description: '블로그',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <ImageProvider>
            <Navbar />
            {children}
          </ImageProvider>
        </Provider>
      </body>
    </html>
  )
}
