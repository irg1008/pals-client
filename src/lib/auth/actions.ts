'use server'

import { http, parse, parseEmpty } from '@/lib/api'
import { config } from '@/lib/config/env'
import { LogInData, ResetPasswordData, SignUpData } from '@/lib/schemas/auth'
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import setCookie from 'set-cookie-parser'

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
  const res = http.post('auth/email/confirm', { json: { token } })
  return parseEmpty(res)
}

export const sendConfirmEmail = (email: string) => {
  const res = http.get('auth/email/request/confirm', { searchParams: { email } })
  return parseEmpty(res)
}

export const sendPasswordResetEmail = (email: string) => {
  const res = http.get('auth/email/request/passwd-reset', { searchParams: { email } })
  return parseEmpty(res)
}

export const resetPassword = (token: string, formData: ResetPasswordData) => {
  const res = http.post('auth/email/passwd-reset', { json: { token, ...formData } })
  return parseEmpty(res)
}

export const logOut = async () => {
  const { ok } = await http.get('auth/logout')
  if (ok) deleteAuthCookies()
}

export const parseExternalURL = (provider: ExeternalAuthProviders) => {
  const url = new URL(`${config.apiUrl}/auth/${provider}/login`)
  url.searchParams.append('from', config.appUrl)
  return url.toString()
}

export const externalLogIn = async (provider: ExeternalAuthProviders) => {
  redirect(parseExternalURL(provider))
}

//#region Auth headers and cookies

const JWT = 'JWT'
const XSRF = 'XSRF-TOKEN'
const XSRF_HEADER = 'X-XSRF-TOKEN'

const getAuthCookies = () => {
  const cookiesStore = cookies()
  return {
    jwt: cookiesStore.get(JWT),
    xsrf: cookiesStore.get(XSRF)
  }
}

const deleteAuthCookies = () => {
  const cookiesStore = cookies()
  cookiesStore.delete(JWT)
  cookiesStore.delete(XSRF)
}

export const setAuthHeaders = (headers: Headers) => {
  const { jwt, xsrf } = getAuthCookies()
  if (jwt) headers.set('cookie', `${jwt.name}=${jwt.value}`)
  if (xsrf) headers.set(XSRF_HEADER, xsrf.value)
}

export const transverseAuthCookies = (headers: Headers) => {
  const cookiesStore = cookies()
  const cookie = headers.getSetCookie()
  const parsed = setCookie.parse(cookie)

  parsed.forEach((c) => {
    cookiesStore.set(c as ResponseCookie)
  })
}

//#endregion
