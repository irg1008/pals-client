import { config } from '@/lib/config/env'
import { revalidatePath } from 'next/cache'
import SuperTokens from 'supertokens-web-js'
import EmailPassword, { sendPasswordResetEmail } from 'supertokens-web-js/recipe/emailpassword'
import EmailVerification, {
  sendVerificationEmail,
  verifyEmail
} from 'supertokens-web-js/recipe/emailverification'
import Session from 'supertokens-web-js/recipe/session'
import ThirdPartyEmailPassword, {
  emailPasswordSignIn,
  emailPasswordSignUp
} from 'supertokens-web-js/recipe/thirdpartyemailpassword'
import { LogInData, SignUpData } from '../schemas/auth'

export const revalidateAuth = () => {
  revalidatePath('@dashboard')
}

export const initAuthProvider = () => {
  SuperTokens.init({
    appInfo: {
      apiDomain: config.apiUrl,
      apiBasePath: '/auth',
      appName: 'Pals'
    },
    recipeList: [
      EmailVerification.init(),
      Session.init(),
      EmailPassword.init(),
      ThirdPartyEmailPassword.init()
    ],
    enableDebugLogs: true
  })
}

type FormField<T> = {
  id: T
  error: string
}

export const signUp = async ({ email, password }: SignUpData) => {
  const res = await emailPasswordSignUp({
    formFields: [
      { id: 'email', value: email },
      { id: 'password', value: password }
    ]
  })

  if (res.status === 'OK') return
  if (res.status === 'FIELD_ERROR') return res.formFields as FormField<keyof SignUpData>[]
}

export const logIn = async ({ email, password }: LogInData) => {
  const res = await emailPasswordSignIn({
    formFields: [
      { id: 'email', value: email },
      { id: 'password', value: password }
    ]
  })

  if (res.status === 'OK') {
    revalidateAuth()
    return
  }

  if (res.status === 'FIELD_ERROR') return res.formFields as FormField<keyof LogInData>[]
  if (res.status === 'WRONG_CREDENTIALS_ERROR')
    return [{ id: 'email', error: 'Wrong email or password' }] as FormField<keyof LogInData>[]
}

export const isLogged = () => {
  return Session.doesSessionExist()
}

export const logOut = async () => {
  await Session.signOut()
  revalidateAuth()
}

export const getUserId = () => {
  return Session.getUserId()
}

export const sendResetPasswordEmail = async (email: string) => {
  try {
    const res = await sendPasswordResetEmail({
      formFields: [{ id: 'email', value: email }]
    })

    if (res.status === 'OK') return
    if (res.status === 'FIELD_ERROR') return res.formFields as FormField<'email'>[]
  } catch (err) {
    console.log(err)
  }
}

export const sendConfirmEmail = async () => {
  const res = await sendVerificationEmail()
  return res.status === 'OK'
}

export const consumeVerificationCode = async () => {
  const res = await verifyEmail()
  return res.status === 'OK'
}
