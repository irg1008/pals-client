import { InputProps } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { forwardRef } from 'react'
import { ErrorProps, Input } from './input'

export const EmailInput = forwardRef<HTMLInputElement, InputProps & ErrorProps>((props, ref) => {
  const t = useTranslations('UI.input.email')

  return (
    <Input type="email" label={t('label')} placeholder={t('placeholder')} {...props} ref={ref} />
  )
})

EmailInput.displayName = 'EmailInput'
