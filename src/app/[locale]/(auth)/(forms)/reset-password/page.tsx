'use client'

import { EmailForm } from '@/components/ui/email-form'
import { sendPasswordResetEmail } from '@/lib/auth/actions'
import { Card, CardBody } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { PiEnvelopeDuotone } from 'react-icons/pi'

export default function EmailToResetPassword() {
  const t = useTranslations('ResetPassword.email')
  const { push } = useRouter()

  const onSubmit = async (email: string) => {
    const { error } = await sendPasswordResetEmail(email)
    if (error) return t('notFound')
    return push('/check-email/reset-password')
  }

  return (
    <>
      <header className="self-end flex flex-col items-center">
        <PiEnvelopeDuotone size={120} className="text-primary-500" />
        <h2 className="text-3xl text-balance text-center">{t('cta')}</h2>
      </header>

      <section>
        <Card>
          <CardBody className="overflow-hidden">
            <EmailForm
              onSubmit={(v) => onSubmit(v.email)}
              submitLabel={t('submit')}
              submittingLabel={t('submitting')}
            />
          </CardBody>
        </Card>
      </section>
    </>
  )
}
