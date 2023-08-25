import ky, { KyResponse } from 'ky'

export const api = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  timeout: 30 * 1000,
  throwHttpErrors: false,
  credentials: 'include'
})

type Error = {
  message: string
  status: number
}

type ResponseWithError<T> =
  | {
      data: T
      error?: never
    }
  | {
      data?: never
      error: Error
    }

async function error(res: KyResponse): Promise<Error> {
  const err = await res.json<{ message: string }>()
  return { message: err.message, status: res.status }
}

export async function customParse<T>(
  cb: Promise<KyResponse>,
  parser: (res: KyResponse) => Promise<T>
) {
  const res = await cb
  return res.ok ? { data: await parser(res) } : { error: await error(res) }
}

export async function parse<T>(cb: Promise<KyResponse>) {
  return customParse<T>(cb, (res) => res.json())
}

export const parsePlain = (cb: Promise<KyResponse>): Promise<ResponseWithError<string>> => {
  return customParse(cb, (res) => res.text())
}

export const parseEmpty = (cb: Promise<KyResponse>): Promise<ResponseWithError<null>> => {
  return customParse(cb, () => Promise.resolve(null))
}
