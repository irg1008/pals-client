'use client'

import { PasswordInput } from '@/components/ui/password-input'
import { resetPassword } from '@/lib/auth/actions'
import type { ResetPasswordData } from '@/lib/schemas/auth'
import { ResetPasswordSchema } from '@/lib/schemas/auth'
import { resolver } from '@/lib/schemas/resolver'
import { Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export const ResetPasswordForm = ({ children, token }: PropsWithChildren<{ token: string }>) => {
  const t = useTranslations('ResetPassword')
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError
  } = useForm<ResetPasswordData>({
    resolver: resolver(ResetPasswordSchema)
  })

  const { push } = useRouter()

  const onSubmit: SubmitHandler<ResetPasswordData> = async (data) => {
    const { error } = await resetPassword(token, data)
    if (error) {
      setError('password', { message: t('errors.invalidRequest') })
      return
    }

    toast.success(t('success'))
    push('/login')
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <PasswordInput
        label={t('newPassword.label')}
        placeholder={t('newPassword.placeholder')}
        error={errors.password?.message}
        {...register('password')}
      />
      <PasswordInput
        label={t('confirmPassword.label')}
        placeholder={t('confirmPassword.placeholder')}
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <footer className="flex gap-3 flex-col mt-3">
        <Button fullWidth color="primary" type="submit" isLoading={isSubmitting}>
          {isSubmitting ? t('submitting') : t('submit')}
        </Button>
        {children}
      </footer>
    </form>
  )
}
