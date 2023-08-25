import { isLogged } from '@/guards/auth'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  const logged = isLogged()
  if (logged) redirect('/')

  return (
    <main className="h-screen bg-default-50 relative before:fade-mask-down before:bg-noise before:opacity-25 [&>*:last-child]:relative">
      {children}
    </main>
  )
}
