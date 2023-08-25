'use client'

import { Button } from '@nextui-org/react'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div>
      <Button as={Link} href="/example">
        dashboard
      </Button>
    </div>
  )
}
