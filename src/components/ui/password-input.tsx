import { InputProps } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { forwardRef } from 'react'
import { PiEyeDuotone, PiEyeSlashDuotone } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'
import { useToggle } from 'usehooks-ts'
import { ErrorProps, Input } from './input'

export const PasswordInput = forwardRef<HTMLInputElement, InputProps & ErrorProps>((props, ref) => {
  const [visible, togglevisible] = useToggle(false)
  const t = useTranslations('UI.input.password')

  return (
    <Input
      label={t('label')}
      placeholder={t('placeholder')}
      type={visible ? 'text' : 'password'}
      {...props}
      ref={ref}
      endContent={
        <button
          className={twMerge('outline-none text-inherit flex', props.error ? 'text-danger' : '')}
          type="button"
          onClick={togglevisible}
        >
          {props.validationState}
          {visible ? <PiEyeSlashDuotone /> : <PiEyeDuotone />}
        </button>
      }
    />
  )
})

PasswordInput.displayName = 'PasswordInput'
