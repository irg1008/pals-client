'use client'

import { Link } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import NextLink from 'next/link'
import { PiFlyingSaucerDuotone } from 'react-icons/pi'

export default function NotFound() {
  const t = useTranslations('NotFound')

  return (
    <div className="grid place-content-center justify-items-center min-h-screen gap-4 text-center">
      <PiFlyingSaucerDuotone size={80} />
      <div>
        <h2 className="uppercase text-3xl font-bold mb-2">404: {t('title')}</h2>
        <p className="text-foreground-500">{t('description')}</p>
      </div>
      <Link color="primary" isBlock as={NextLink} href="/">
        {t('homeLink')}
      </Link>
    </div>
  )
}
