'use client'

import { useAuth } from '@/stores/auth.store'
import { Link, Spinner } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import NextLink from 'next/link'
import { toast } from 'react-hot-toast'
import { PiSmileyXEyesDuotone } from 'react-icons/pi'

export default function EmailConfirmed({ params }: { params: { token: string } }) {
  const { confirmEmail } = useAuth()

  const { isLoading } = useQuery({
    queryKey: ['email-confirmed'],
    queryFn: async () => {
      const error = await confirmEmail(params.token)
      if (!error) toast.success('Email confirmed successfully')
    },
    staleTime: Infinity
  })

  if (isLoading) return <Spinner size="lg" />

  return (
    <>
      <PiSmileyXEyesDuotone size={80} />
      <div>
        <h2 className="uppercase text-3xl font-bold mb-2">Invalid request</h2>
        <p className="text-foreground-500">The request is invalid or has expired.</p>
        <Link color="primary" isBlock as={NextLink} href="/login" className="mt-4">
          Go to Sign In
        </Link>
      </div>
    </>
  )
}
