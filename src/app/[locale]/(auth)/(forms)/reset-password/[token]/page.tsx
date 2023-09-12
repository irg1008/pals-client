'use client'

import { ResetPasswordForm } from '@/components/auth/reset-password'
import { Card, CardBody } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { PiLockKeyDuotone } from 'react-icons/pi'

export default function ResetPassword({ params }: { params: { token: string } }) {
  const t = useTranslations('ResetPassword')
  return (
    <>
      <header className="self-end flex flex-col items-center">
        <PiLockKeyDuotone size={120} className="text-primary-500" />
        <h2 className="text-3xl text-center text-balance">{t('cta')}</h2>
      </header>

      <section>
        <Card>
          <CardBody className="overflow-hidden">
            <ResetPasswordForm token={params.token}></ResetPasswordForm>
          </CardBody>
        </Card>
      </section>
    </>
  )
}
