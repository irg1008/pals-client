'use client'

import { Link } from '@nextui-org/react'
import NextLink from 'next/link'
import { PiFlyingSaucerDuotone } from 'react-icons/pi'

export default function NotFound() {
  return (
    <div className="grid place-content-center justify-items-center h-screen gap-4 text-center">
      <PiFlyingSaucerDuotone size={80} />
      <div>
        <h2 className="uppercase text-3xl font-bold mb-2">Not Found</h2>
        <p className="text-foreground-500">Could not find requested resource</p>
      </div>
      <Link color="primary" isBlock as={NextLink} href="/">
        Return Home
      </Link>
    </div>
  )
}
