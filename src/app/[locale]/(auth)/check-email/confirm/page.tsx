import { useTranslations } from 'next-intl'
import { PiThumbsUpDuotone } from 'react-icons/pi'

export default function SignUpCompleted() {
  const t = useTranslations('ConfirmEmail.request')

  return (
    <div className="flex flex-col items-center gap-4 animate-appearance-in">
      <PiThumbsUpDuotone size={80} />
      <div>
        <h2 className="uppercase text-3xl font-bold mb-2">{t('sent')}</h2>
        <p className="text-foreground-500">{t('checkInbox')}</p>
      </div>
    </div>
  )
}
