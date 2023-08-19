import ky, { KyResponse } from 'ky'

export const api = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  timeout: 30 * 1000,
  throwHttpErrors: false,
  credentials: 'include'
})

type ResponseWithError<T> =
  | {
      data: T
      error?: never
    }
  | {
      data?: never
      error: { message: string; status: number }
    }

async function withError<T>(res: KyResponse): Promise<ResponseWithError<T>> {
  const err = await res.json<{ message: string }>()
  return { error: { message: err.message, status: res.status } }
}

export async function customParse<T>(
  cb: Promise<KyResponse>,
  getData: (res: KyResponse) => Promise<T>
) {
  const res = await cb
  if (res.ok) {
    return { data: await getData(res) }
  }
  return withError<T>(res)
}

export async function parse<T>(cb: Promise<KyResponse>) {
  return customParse<T>(cb, (res) => res.json())
}

export async function parsePlain(cb: Promise<KyResponse>): Promise<ResponseWithError<string>> {
  return customParse(cb, (res) => res.text())
}

export async function parseEmpty(cb: Promise<KyResponse>): Promise<ResponseWithError<null>> {
  return customParse(cb, () => Promise.resolve(null))
}
