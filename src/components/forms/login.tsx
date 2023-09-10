'use client'

import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { logIn, sendConfirmEmail } from '@/lib/auth/actions'
import { LogInData, LogInSchema } from '@/lib/schemas/auth'
import { resolver } from '@/lib/schemas/resolver'
import { Button, Divider, Link } from '@nextui-org/react'
import NextLink from 'next/link'
import { PropsWithChildren } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ExternalAuth } from './external-auth'

export const LoginInForm = ({ children }: PropsWithChildren) => {
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
        setError('email', { message: 'User or password is incorrect' })
        break
      case 500:
        sendConfirmEmail(formData.email)
        toast.promise(sendConfirmEmail(formData.email), {
          loading: 'You are not verified. Sending new confirmation email...',
          success: 'Email sent. Check your inbox',
          error: 'Something went wrong'
        })
        break
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <ExternalAuth google={{ label: 'Log in with Google' }} apple={{ hidden: true }} />

      <Divider className="my-2" />

      <Input
        variant="bordered"
        isRequired
        label="Email"
        placeholder="Enter your email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <PasswordInput
        variant="bordered"
        isRequired
        label="Password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register('password')}
      />
      <div className="ml-auto">
        <Link as={NextLink} href="/reset-password" isBlock size="sm">
          Forgot password?
        </Link>
      </div>
      <footer className="flex gap-3 flex-col mt-3">
        <Button fullWidth color="primary" type="submit" isLoading={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </Button>
        {children}
      </footer>
    </form>
  )
}
