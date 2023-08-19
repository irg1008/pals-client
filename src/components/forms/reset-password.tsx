import { PasswordInput } from '@/components/ui/password-input'
import type { ResetPasswordData } from '@/lib/schemas/auth'
import { ResetPasswordSchema } from '@/lib/schemas/auth'
import { resolver } from '@/lib/schemas/resolver'
import { useAuth } from '@/stores/auth.store'
import { Button } from '@nextui-org/react'
import { PropsWithChildren } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export const ResetPasswordForm = ({ children, token }: PropsWithChildren<{ token: string }>) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError
  } = useForm<ResetPasswordData>({
    resolver: resolver(ResetPasswordSchema)
  })

  const { resetPassword } = useAuth()

  const onSubmit: SubmitHandler<ResetPasswordData> = async (data) => {
    const error = await resetPassword(token, data)
    if (error) setError('password', { message: 'The request is not valid or has expired' })
    else toast.success('Password changed successfully')
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <PasswordInput
        variant="bordered"
        isRequired
        label="New Password"
        placeholder="Enter your new password"
        error={errors.password?.message}
        {...register('password')}
      />
      <PasswordInput
        variant="bordered"
        isRequired
        label="Confirm Password"
        placeholder="Enter your password again"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <footer className="flex gap-3 flex-col mt-3">
        <Button fullWidth color="primary" type="submit" isLoading={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Reset password'}
        </Button>
        {children}
      </footer>
    </form>
  )
}
