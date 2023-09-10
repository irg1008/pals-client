import { config } from '@/lib/config/env'
import ky, { KyResponse } from 'ky'
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'
import setCookie from 'set-cookie-parser'

const populateResponseCookies = (res: KyResponse) => {
  const header = res.headers.getSetCookie()
  setCookie.parse(header).forEach((c) => {
    cookies().set(c as ResponseCookie)
  })
  return res
}

const populateAuthRequest = (req: Request) => {
  const cookiesStore = cookies()

  const jwt = cookiesStore.get('JWT')
  const xsrf = cookiesStore.get('XSRF-TOKEN')

  if (jwt) req.headers.set('cookie', `${jwt.name}=${jwt.value}`)
  if (xsrf) req.headers.set('X-XSRF-TOKEN', xsrf.value)
}

export const http = ky.extend({
  prefixUrl: `${config.apiUrl}`,
  throwHttpErrors: false,
  credentials: 'include',
  hooks: {
    beforeRequest: [(request) => populateAuthRequest(request)],
    afterResponse: [async (_, __, response) => populateResponseCookies(response)]
  }
})

export const api = http.extend({
  prefixUrl: `${config.apiUrl}/api`,
  timeout: 30 * 1000
})

type ErrorResponse = { message?: string; error?: string }
type Error = ErrorResponse & { status: number }

export type ResponseWithError<T> = { data: T; error?: never } | { data?: never; error: Error }

async function error(res: KyResponse): Promise<Error> {
  const err = await res.json<Omit<Error, 'status'>>()
  return { message: err.message, status: res.status, error: err.error }
}

export async function customParse<T>(
  cb: Promise<KyResponse>,
  parser: (res: KyResponse) => Promise<T>
): Promise<ResponseWithError<T>> {
  const res = await cb
  return res.ok ? { data: await parser(res) } : { error: await error(res) }
}

export const parsePlain = (cb: Promise<KyResponse>) => customParse(cb, (res) => res.text())

export const parseEmpty = (cb: Promise<KyResponse>) => customParse(cb, () => Promise.resolve(null))

export async function parse<T>(cb: Promise<KyResponse>) {
  return customParse<T>(cb, (res) => res.json())
}
