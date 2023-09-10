import { Navbar } from '@/components/navbar'
import { getUser } from '@/lib/auth/actions'
import { ReactNode } from 'react'

type ParallelRoutes = {
  dashboard: ReactNode
  landing: ReactNode
}

export default async function Layout({ dashboard, landing }: ParallelRoutes) {
  const user = await getUser()

  return (
    <>
      <Navbar user={user} />
      <main className="p-4 max-w-screen-xl mx-auto">{user ? dashboard : landing}</main>
    </>
  )
}
