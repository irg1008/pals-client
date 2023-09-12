import { EmailInput } from '@/components/ui/email-input'
import { PasswordInput } from '@/components/ui/password-input'
import { signUp } from '@/lib/auth/actions'
import type { SignUpData } from '@/lib/schemas/auth'
import { SignUpSchema } from '@/lib/schemas/auth'
import { resolver } from '@/lib/schemas/resolver'
import { Button, Divider } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ExternalAuth } from './external-auth'

export const SignUpForm = ({ children }: PropsWithChildren) => {
  const t = useTranslations('SignUp')
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<SignUpData>({
    resolver: resolver(SignUpSchema)
  })

  const { push } = useRouter()

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    const { error } = await signUp(data)
    if (!error) return push('/check-email/confirm')

    switch (error.status) {
      case 409:
        setError('email', { message: t('errors.emailInUse') })
        break
      default:
        setError('email', { message: t('errors.default') })
        break
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <ExternalAuth google={{ label: t('googleLabel') }} apple={{ hidden: true }} />

      <Divider className="my-2" />

      <EmailInput error={errors.email?.message} {...register('email')} />
      <PasswordInput error={errors.password?.message} {...register('password')} />

      <footer className="flex gap-3 flex-col mt-3">
        <Button fullWidth color="primary" type="submit" isLoading={isSubmitting}>
          {isSubmitting ? t('submitting') : t('submit')}
        </Button>
        {children}
      </footer>
    </form>
  )
}
