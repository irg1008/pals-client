import { InputProps } from '@nextui-org/react'
import { forwardRef } from 'react'
import { PiEyeDuotone, PiEyeSlashDuotone } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'
import { useToggle } from 'usehooks-ts'
import { ErrorProps, Input } from './input'

export const PasswordInput = forwardRef<HTMLInputElement, InputProps & ErrorProps>((props, ref) => {
  const [visible, togglevisible] = useToggle(false)

  return (
    <Input
      {...props}
      ref={ref}
      label="Password"
      placeholder="Enter your password"
      type={visible ? 'text' : 'password'}
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
