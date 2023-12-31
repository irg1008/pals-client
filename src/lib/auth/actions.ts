'use server'

import { api, http, parse, parseEmpty } from '@/lib/api'
import { LogInData, ResetPasswordData, SignUpData } from '@/lib/schemas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { config } from '../config/env'

type LoggedResponse = {
  status: 'not logged in' | 'logged in'
  user?: string
}

type Role = 'admin' | 'user'

export type User = {
  id: string
  name: string
  picture?: string
  attrs: {
    admin: boolean
    role: Role
  }
}

export type ExeternalAuthProviders = 'google' | 'apple'

export const isLogged = async () => {
  const res = http.get('auth/status')
  const { data, error } = await parse<LoggedResponse>(res)
  if (error) return false
  return data.status === 'logged in'
}

export const logIn = ({ email, password }: LogInData) => {
  const params = new URLSearchParams()
  params.append('user', email)
  params.append('passwd', password)

  const res = http.post('auth/email/login', { body: params })
  return parse<User>(res)
}

export const signUp = (params: SignUpData) => {
  const res = http.post('auth/email/signup', { json: params })
  return parseEmpty(res)
}

export const getUser = async () => {
  const res = http.get('auth/user')
  const { data } = await parse<User>(res)
  return data
}

export const confirmEmail = (token: string) => {
  const req = http.post('auth/email/confirm', { json: { token } })
  return parseEmpty(req)
}

export const sendConfirmEmail = (email: string) => {
  const req = http.get('auth/email/request/confirm', { searchParams: { email } })
  return parseEmpty(req)
}

export const sendPasswordResetEmail = (email: string) => {
  const req = http.get('auth/email/request/passwd-reset', { searchParams: { email } })
  return parseEmpty(req)
}

export const resetPassword = (token: string, formData: ResetPasswordData) => {
  const req = http.post('auth/email/passwd-reset', { json: { token, ...formData } })
  return parseEmpty(req)
}

export const logOut = async () => {
  const { ok } = await http.get('auth/logout')
  if (ok) {
    cookies().delete('JWT')
    cookies().delete('XSRF-TOKEN')
  }
}

export const parseExternalURL = (provider: ExeternalAuthProviders) => {
  const url = new URL(`${config.apiUrl}/auth/${provider}/login`)
  url.searchParams.append('from', config.appUrl)
  return url.toString()
}

export const externalLogIn = async (provider: ExeternalAuthProviders) => {
  redirect(parseExternalURL(provider))
}

// TODO: Move to other place
export const protectedRoute = () => {
  const res = api.get('protected')
  return parse<{ message: string }>(res)
}
