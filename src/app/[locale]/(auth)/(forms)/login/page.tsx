'use client'

import { LoginInForm } from '@/components/auth/login'
import { Card, CardBody, Link } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import NextLink from 'next/link'
import { PiUserCircleDuotone } from 'react-icons/pi'

export default function LogIn() {
  const t = useTranslations('LogIn')
  return (
    <>
      <header className="self-end flex flex-col items-center">
        <PiUserCircleDuotone size={120} className="text-primary-500" />
        <h2 className="text-3xl text-balance text-center">{t('title')}</h2>
      </header>

      <section>
        <Card>
          <CardBody className="overflow-hidden">
            <LoginInForm>
              <p className="text-center text-small">
                {t('noAccount')}
                <Link as={NextLink} className="ml-2" isBlock size="sm" href="/signup">
                  {t('signUpLink')}
                </Link>
              </p>
            </LoginInForm>
          </CardBody>
        </Card>
      </section>
    </>
  )
}
