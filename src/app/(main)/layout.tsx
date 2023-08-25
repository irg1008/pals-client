import { Navbar } from '@/components/navbar'
import { isLogged } from '@/guards/auth'
import { ReactNode } from 'react'

type ParallelRoutes = {
  dashboard: ReactNode
  landing: ReactNode
}

export default function Layout({ dashboard, landing }: ParallelRoutes) {
  const logged = isLogged()

  return (
    <>
      <Navbar isLogged={logged} />
      <main className="p-4 max-w-screen-xl mx-auto">{logged ? dashboard : landing}</main>
    </>
  )
}
