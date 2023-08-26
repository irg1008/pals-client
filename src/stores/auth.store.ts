import { api, parse, parseEmpty } from '@/lib/api'
import type { LogInData, ResetPasswordData, SignUpData } from '@/lib/schemas/auth'
import { useRouter } from 'next/navigation'
import { create } from 'zustand'

type AuthStore = {
  accessToken?: string
  setAccessToken: (token: string) => void
  resetAccessToken: () => void
}

type Token = {
  accessToken: string
}

export const authStore = create<AuthStore>()((set) => ({
  accessToken: undefined,
  setAccessToken: (token: string) => set({ accessToken: token }),
  resetAccessToken: () => set({ accessToken: undefined })
}))

export const useAuth = () => {
  const { resetAccessToken, setAccessToken, accessToken } = authStore()

  const { refresh, push } = useRouter()
  authStore.subscribe(() => {
    // Let the server revalidate logged state to handle redirects accordingly
    refresh()
  })

  const login = async (formData: LogInData) => {
    const { data, error } = await parse<Token>(api.post('auth/login', { json: formData }))
    if (error) return error
    setAccessToken(data.accessToken)
  }

  const logout = async () => {
    await api.get('auth/logout')
    resetAccessToken()
    push('/')
  }

  const signUp = async (formData: SignUpData) => {
    const req = api.post('auth/signup', { json: formData })
    const { error } = await parseEmpty(req)
    return error
  }

  const confirmEmail = async (token: string) => {
    const req = api.post('auth/confirm-email', { json: { token } })
    const { error, data } = await parse<Token>(req)
    if (error) return error
    setAccessToken(data.accessToken)
  }

  const createConfirmationRequest = async (email: string) => {
    const req = api.get('auth/request/confirm-email', { searchParams: { email } })
    const { error } = await parseEmpty(req)
    return error
  }

  const createPasswordResetRequest = async (email: string) => {
    const req = api.get('auth/request/reset-password', { searchParams: { email } })
    const { error } = await parseEmpty(req)
    return error
  }

  const resetPassword = async (token: string, formData: ResetPasswordData) => {
    const req = api.post('auth/reset-password', { json: { token, ...formData } })
    const { error, data } = await parse<Token>(req)
    if (error) return error
    setAccessToken(data.accessToken)
  }

  const refreshToken = async () => {
    const req = api.get('auth/refresh', {
      hooks: {
        beforeError: [
          (err) => {
            console.log(err)
            if (err.response.status === 401) logout()
            return err
          }
        ]
      }
    })

    const { data, error } = await parse<Token>(req)
    if (error) return null

    const { accessToken } = data
    setAccessToken(accessToken)
    return accessToken
  }

  return {
    login,
    refreshToken,
    logout,
    accessToken,
    signUp,
    confirmEmail,
    createConfirmationRequest,
    createPasswordResetRequest,
    resetPassword
  }
}
