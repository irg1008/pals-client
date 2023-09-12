import { isLogged } from '@/lib/auth/actions'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default async function AuthLayout({ children }: PropsWithChildren) {
  const logged = await isLogged()
  if (logged) redirect('/')

  return (
    <main className="h-screen bg-default-50 relative before:fade-mask-down before:bg-noise before:opacity-25 [&>*:last-child]:relative px-4">
      {children}
    </main>
  )
}
