'use client'

import { confirmEmail } from '@/lib/auth/actions'
import { Link } from '@nextui-org/react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { PiSmileyXEyesDuotone } from 'react-icons/pi'
import useSWR from 'swr'

export default function EmailConfirmed({ params }: { params: { token: string } }) {
  const { push } = useRouter()

  const { data } = useSWR('email-confirmed', {
    fetcher: () => confirmEmail(params.token),
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnMount: true
  })

  if (data && !data.error) {
    toast.success('Please log in to continue')
    push('/login')
  }

  return (
    data?.error && (
      <div className="flex flex-col items-center gap-4 animate-appearance-in">
        <PiSmileyXEyesDuotone size={80} />
        <div>
          <h2 className="uppercase text-3xl font-bold mb-2">Invalid request</h2>
          <p className="text-foreground-500">The request is invalid or has expired.</p>
          <Link color="primary" isBlock as={NextLink} href="/login" className="mt-4">
            Go to Sign In
          </Link>
        </div>
      </div>
    )
  )
}
