import {
  Input as Infer,
  ValiError,
  email,
  maxLength,
  minLength,
  object,
  regex,
  string
} from 'valibot'

const emailSchema = string([email('Email is invalid')])
const passwordSchema = string([
  minLength(5, 'Password must be at least 5 characters'),
  maxLength(100, 'Password must be at most 100 characters'),
  regex(
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^\w\d\s:])([^\s]).*$/,
    'Password must contain at least one number, one letter and one special character'
  )
])

const confirmPasswordSchema = string([minLength(1, 'This field is required')])
const confirmPasswordPredicate = <
  T extends {
    password: string
    confirmPassword: string
  }
>(
  input: T
) => {
  const { password, confirmPassword } = input
  if (password !== confirmPassword) {
    throw new ValiError([
      {
        reason: 'string',
        validation: 'custom',
        origin: 'value',
        message: 'Passwords do not match.',
        input: input.confirmPassword,
        path: [
          {
            schema: 'object',
            input: input,
            key: 'confirmPassword',
            value: input.confirmPassword
          }
        ]
      }
    ])
  }
  return input
}

// Reset password

export const ResetPasswordSchema = object(
  {
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema
  },
  [confirmPasswordPredicate]
)

export type ResetPasswordData = Infer<typeof ResetPasswordSchema>

// Sign up

export const SignUpSchema = object(
  {
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema
  },
  [confirmPasswordPredicate]
)

export type SignUpData = Infer<typeof SignUpSchema>

// Log in

export const LogInSchema = object({
  email: emailSchema,
  password: string([minLength(1, 'Password is required')])
})

export type LogInData = Infer<typeof LogInSchema>

// Email form

export const EmailSchema = object({
  email: emailSchema
})

export type EmailData = Infer<typeof EmailSchema>
