'use client'

import { useAuthGuard } from '@/guards/auth.guard'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default function ProtectedLayout({ children }: PropsWithChildren) {
  const { isLogged } = useAuthGuard()
  if (!isLogged) redirect('/login')

  return <>{children}</>
}
