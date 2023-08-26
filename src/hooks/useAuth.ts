import { api, parse, parseEmpty } from '@/lib/api'
import { LogInData, ResetPasswordData, SignUpData } from '@/lib/schemas/auth'
import { Token, authStore } from '@/stores/auth.store'

export const useAuth = () => {
  const { resetAccessToken, setAccessToken, accessToken } = authStore()

  const login = async (formData: LogInData) => {
    const { data, error } = await parse<Token>(api.post('auth/login', { json: formData }))
    if (error) return error
    setAccessToken(data.accessToken)
  }

  const logout = async () => {
    await api.get('auth/logout')
    resetAccessToken()
  }

  const signUp = async (formData: SignUpData) => {
    const req = api.post('auth/signup', { json: formData })
    const { error } = await parseEmpty(req)
    return error
  }

  const confirmEmail = async (token: string) => {
    const req = api.post('auth/confirm-email', { json: { token } })
    const { data, error } = await parse<Token>(req)
    if (error) throw error
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
    const req = api.get('auth/refresh')

    const { data, error } = await parse<Token>(req)
    if (error) {
      logout()
      return null
    }

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
