'use client'

import { useAuth } from '@/stores/auth.store'
import { Button } from '@nextui-org/react'
import NextLink from 'next/link'

export default function Navbar() {
  const { isLogged, logout } = useAuth()

  return isLogged ? (
    <Button variant="shadow" color="secondary" onClick={() => logout()}>
      Logout
    </Button>
  ) : (
    <Button as={NextLink} href="/login" variant="shadow" color="primary">
      Login
    </Button>
  )
}
