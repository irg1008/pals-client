import { setAuthHeaders, transverseAuthCookies } from '@/lib/auth/actions'
import { config } from '@/lib/config/env'
import ky, { KyResponse } from 'ky'

type Error = { message?: string; error?: string; status: number }
export type ResponseWithError<T> = { data: T; error?: never } | { data?: never; error: Error }

export const http = ky.extend({
  prefixUrl: `${config.apiUrl}`,
  throwHttpErrors: false,
  hooks: {
    beforeRequest: [({ headers }) => setAuthHeaders(headers)],
    afterResponse: [(_, __, { headers }) => transverseAuthCookies(headers)]
  }
})

export const api = http.extend({
  prefixUrl: `${config.apiUrl}/api`,
  timeout: 30 * 1000
})

export async function customParse<T>(
  cb: Promise<KyResponse>,
  parser: (res: KyResponse) => Promise<T>
): Promise<ResponseWithError<T>> {
  const res = await cb
  return res.ok
    ? {
        data: await parser(res)
      }
    : {
        error: await error(res)
      }
}

async function error(res: KyResponse): Promise<Error> {
  const err = await res.json<Omit<Error, 'status'>>()
  return { status: res.status, ...err }
}

export const parsePlain = (cb: Promise<KyResponse>) => customParse(cb, (res) => res.text())

export const parseEmpty = (cb: Promise<KyResponse>) => customParse(cb, () => Promise.resolve(null))

export const parse = <T>(cb: Promise<KyResponse>) => customParse<T>(cb, (res) => res.json())
