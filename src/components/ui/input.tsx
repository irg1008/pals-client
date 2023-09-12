import { InputProps, Input as NextInput } from '@nextui-org/react'
import { forwardRef } from 'react'

export type ErrorProps = {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps & ErrorProps>((props, ref) => {
  return (
    <NextInput
      variant="bordered"
      {...props}
      ref={ref}
      errorMessage={props.error}
      validationState={props.error ? 'invalid' : undefined}
    />
  )
})

Input.displayName = 'Input'
