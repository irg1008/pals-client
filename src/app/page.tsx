'use client'

import Navbar from '@/components/navbar'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Button as={Link} href="/example">
        dashboard
      </Button>
      <Navbar />
    </>
  )
}
