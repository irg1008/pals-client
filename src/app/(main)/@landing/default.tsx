'use client'

import { Link } from '@nextui-org/react'
import NextLink from 'next/link'
import { PiProhibitDuotone } from 'react-icons/pi'

export default function Forbidden() {
  return (
    <div className="grid justify-items-center flex-grow gap-4 text-center p-10">
      <PiProhibitDuotone size={80} />
      <div>
        <h2 className="uppercase text-3xl font-bold mb-2">Forbidden</h2>
        <p className="text-foreground-500">You must be logged in to access this page</p>
      </div>
      <Link color="primary" isBlock as={NextLink} href="/login">
        Go to Login
      </Link>
    </div>
  )
}
