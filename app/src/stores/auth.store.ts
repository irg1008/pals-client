import { Path } from '@/router'
import { api } from '@/utils/api'
import { useNavigate } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
import { create } from 'zustand'

type AuthStore = {
	accessToken?: string
	setAccessToken: (token: string) => void
	resetAccessToken: () => void
}

type TokenResponse = {
	accessToken: string
}

const useAuthStore = create<AuthStore>()((set) => ({
	accessToken: undefined,
	setAccessToken: (token: string) => set({ accessToken: token }),
	resetAccessToken: () => set({ accessToken: undefined })
}))

type UseAuthOptions = {
	redirectTo?: Path
}

export const useAuth = ({ redirectTo }: UseAuthOptions = {}) => {
	const { resetAccessToken, setAccessToken, accessToken } = useAuthStore()

	const navigate = useNavigate()
	const isLogged = !!accessToken

	const login = async (email: string, password: string) => {
		const res = await api.post('auth/login', { json: { email, password } })
		const data = await res.json<TokenResponse>()
		setAccessToken(data.accessToken)
	}

	const logout = async () => {
		await api.get('auth/logout')
		if (redirectTo) navigate(redirectTo)
		resetAccessToken()
	}

	const refreshToken = async () => {
		const res = await api.get('auth/refresh', {
			hooks: {
				beforeError: [
					(err) => {
						if (err.response.status === 401) logout()
						return err
					}
				]
			}
		})

		const data = await res.json<TokenResponse>()
		setAccessToken(data.accessToken)
		return data
	}

	return { login, refreshToken, logout, accessToken, isLogged }
}
