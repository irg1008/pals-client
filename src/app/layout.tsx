import '@/app/globals.css'
import { Providers } from '@/app/providers'
import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${font.className} light text-foreground bg-background min-h-screen`}>
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
