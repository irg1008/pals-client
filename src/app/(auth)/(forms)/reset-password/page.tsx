'use client'

import { EmailForm } from '@/components/forms/email-form'
import { useAuth } from '@/stores/auth.store'
import { Card, CardBody } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { PiEnvelopeDuotone } from 'react-icons/pi'

export default function EmailToResetPassword() {
  const { createPasswordResetRequest } = useAuth()
  const { push } = useRouter()

  const onSubmit = async (email: string) => {
    const error = await createPasswordResetRequest(email)
    if (error) return 'Email not found'
    return push('/sent/reset-password')
  }

  return (
    <>
      <header className="self-end flex flex-col items-center">
        <PiEnvelopeDuotone size={120} className="text-primary-500" />
        <h2 className="text-3xl text-balance text-center">Type your email</h2>
      </header>

      <section>
        <Card>
          <CardBody className="overflow-hidden">
            <EmailForm
              onSubmit={(v) => onSubmit(v.email)}
              submitLabel="Send reset request"
              submittingLabel="Sending..."
            />
          </CardBody>
        </Card>
      </section>
    </>
  )
}
