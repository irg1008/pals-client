'use client'

import { SignUpForm } from '@/components/auth/signup'
import { Card, CardBody, Link } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import NextLink from 'next/link'
import { PiUserCirclePlusDuotone } from 'react-icons/pi'

export default function SignUp() {
  const t = useTranslations('SignUp')
  return (
    <>
      <header className="self-end flex flex-col items-center">
        <PiUserCirclePlusDuotone size={120} className="text-primary-500" />
        <h2 className="text-3xl text-balance text-center">{t('title')}</h2>
      </header>

      <section>
        <Card>
          <CardBody className="overflow-hidden">
            <SignUpForm>
              <p className="text-center text-small">
                {t('alreadyAccount')}
                <Link as={NextLink} className="ml-2" isBlock size="sm" href="/login">
                  {t('logInLink')}
                </Link>
              </p>
            </SignUpForm>
          </CardBody>
        </Card>
      </section>
    </>
  )
}
