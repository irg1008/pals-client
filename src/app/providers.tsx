'use client'

import { AuthHandler } from '@/lib/auth/handler'
import { NextUIProvider } from '@nextui-org/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AuthHandler>{children}</AuthHandler>
    </NextUIProvider>
  )
}
