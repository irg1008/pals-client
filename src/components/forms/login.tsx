import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { useAuth } from '@/hooks/useAuth'
import { LogInData, LogInSchema } from '@/lib/schemas/auth'
import { resolver } from '@/lib/schemas/resolver'
import { Button, Link } from '@nextui-org/react'
import NextLink from 'next/link'
import { PropsWithChildren } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

export const LoginInForm = ({ children }: PropsWithChildren) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError
  } = useForm<LogInData>({
    resolver: resolver(LogInSchema)
  })

  const { login, createConfirmationRequest } = useAuth()

  const onSubmit: SubmitHandler<LogInData> = async (data) => {
    const err = await login(data)
    if (!err) return

    if (err.status === 403) {
      setError('email', { message: 'Please confirm your email' })
      toast.promise(createConfirmationRequest(data.email), {
        loading: 'Sending new confirmation email',
        success: 'Confirmation email sent',
        error: 'Error sending confirmation email'
      })
      return
    }

    setError('password', { message: 'Wrong email or password' })
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
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
