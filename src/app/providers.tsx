'use client'

import { NextUIProvider } from '@nextui-org/react'

// if (typeof window !== 'undefined') {
//   initAuthProvider()
// }

export function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>
}
