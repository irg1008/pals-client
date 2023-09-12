'use client'

import { Link } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import NextLink from 'next/link'
import { PiProhibitDuotone } from 'react-icons/pi'

export default function Forbidden() {
  const t = useTranslations('Forbidden')

  return (
    <div className="grid justify-items-center flex-grow gap-4 text-center p-10">
      <PiProhibitDuotone size={80} />
      <div>
        <h2 className="uppercase text-3xl font-bold mb-2">{t('title')}</h2>
        <p className="text-foreground-500">{t('description')}</p>
      </div>
      <Link color="primary" isBlock as={NextLink} href="/login">
        {t('logInLink')}
      </Link>
    </div>
  )
}
