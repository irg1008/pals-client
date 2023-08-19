'use client'

import { useAuthGuard } from '@/guards/auth.guard'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  const { isLogged } = useAuthGuard()
  if (isLogged) redirect('/')

  return (
    <section className="h-screen bg-gradient-to-br from-primary-100 to-secondary-100">
      {children}
    </section>
  )
}
