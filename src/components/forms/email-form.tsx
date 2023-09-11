import { Input } from '@/components/ui/input'
import type { EmailData } from '@/lib/schemas/auth'
import { EmailSchema } from '@/lib/schemas/auth'
import { resolver } from '@/lib/schemas/resolver'
import { Button } from '@nextui-org/react'
import { PropsWithChildren } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type EmailFormProps = {
  onSubmit: (data: EmailData) => Promise<string | void>
  submitLabel: string
  submittingLabel: string
}

export const EmailForm = ({
  children,
  onSubmit,
  submitLabel,
  submittingLabel
}: PropsWithChildren<EmailFormProps>) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError
  } = useForm<EmailData>({
    resolver: resolver(EmailSchema)
  })

  const checkErrors: SubmitHandler<EmailData> = async (data) => {
    const error = await onSubmit(data)
    if (!error) return
    setError('email', { message: error })
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(checkErrors)} noValidate>
      <Input
        variant="bordered"
        isRequired
        label="Email"
        placeholder="Enter your email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <footer className="flex gap-3 flex-col mt-3">
        <Button fullWidth color="primary" type="submit" isLoading={isSubmitting}>
          {isSubmitting ? submittingLabel : submitLabel}
        </Button>
        {children}
      </footer>
    </form>
  )
}
