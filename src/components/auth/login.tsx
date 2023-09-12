'use client'

import { PasswordInput } from '@/components/ui/password-input'
import { logIn, sendConfirmEmail } from '@/lib/auth/actions'
import { LogInData, LogInSchema } from '@/lib/schemas/auth'
import { resolver } from '@/lib/schemas/resolver'
import { Button, Divider, Link } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import NextLink from 'next/link'
import { PropsWithChildren } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { EmailInput } from '../ui/email-input'
import { ExternalAuth } from './external-auth'

export const LoginInForm = ({ children }: PropsWithChildren) => {
  const t = useTranslations('LogIn')
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError
  } = useForm<LogInData>({
    resolver: resolver(LogInSchema)
  })

  const onSubmit: SubmitHandler<LogInData> = async (formData) => {
    const { error } = await logIn(formData)
    if (!error) return

    switch (error.status) {
      case 403:
        setError('email', { message: t('errors.invalidCredentials') })
        break
      case 500:
        sendConfirmEmail(formData.email)
        toast.promise(sendConfirmEmail(formData.email), {
          loading: t('errors.notVerified'),
          success: t('verification.success'),
          error: t('verification.error')
        })
        break
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <ExternalAuth google={{ label: t('googleLabel') }} apple={{ hidden: true }} />

      <Divider className="my-2" />

      <EmailInput error={errors.email?.message} {...register('email')} />
      <PasswordInput error={errors.password?.message} {...register('password')} />

      <div className="ml-auto">
        <Link as={NextLink} href="/reset-password" isBlock size="sm">
          {t('forgotPassword')}
        </Link>
      </div>
      <footer className="flex gap-3 flex-col mt-3">
        <Button fullWidth color="primary" type="submit" isLoading={isSubmitting}>
          {isSubmitting ? t('submitting') : t('submit')}
        </Button>
        {children}
      </footer>
    </form>
  )
}
