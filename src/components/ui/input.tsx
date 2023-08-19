import { InputProps, Input as NextInput } from '@nextui-org/react'
import { forwardRef } from 'react'

export type ErrorProps = {
	error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps & ErrorProps>((props, ref) => {
	return (
		<NextInput
			{...props}
			errorMessage={props.error}
			validationState={props.error ? 'invalid' : undefined}
			ref={ref}
		/>
	)
})

Input.displayName = 'Input'
