import { useTranslations } from 'next-intl'
import { PiLockKeyDuotone } from 'react-icons/pi'

export default function ResetPasswordRequest() {
  const t = useTranslations('ResetPassword.request')
  return (
    <div className="flex flex-col items-center gap-4 animate-appearance-in">
      <PiLockKeyDuotone size={80} />
      <div>
        <h2 className="uppercase text-3xl font-bold mb-2">{t('sent')}</h2>
        <p className="text-foreground">{t('checkInbox')}</p>
      </div>
    </div>
  )
}
