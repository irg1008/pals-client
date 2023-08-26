import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { useAuth } from '@/hooks/useAuth'
import type { SignUpData } from '@/lib/schemas/auth'
import { SignUpSchema } from '@/lib/schemas/auth'
import { resolver } from '@/lib/schemas/resolver'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

export const SignUpForm = ({ children }: PropsWithChildren) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<SignUpData>({
    resolver: resolver(SignUpSchema)
  })

  const { signUp } = useAuth()
  const { push } = useRouter()

  const onSubmit: SubmitHandler<SignUpData> = async (data) => {
    const err = await signUp(data)
    if (!err) return push('/sent/confirm-email')

    if (err.status === 409) setError('email', { message: 'This email is already in use' })
    else if (err.status === 400) setError('password', { message: 'Passwords do not match' })
    else setError('email', { message: 'Something went wrong' })
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
          {isSubmitting ? 'Signing up...' : 'Sign up'}
        </Button>
        {children}
      </footer>
    </form>
  )
}
