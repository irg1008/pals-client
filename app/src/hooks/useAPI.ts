import { useAuth } from '@/stores/auth.store'
import { api } from '@/utils/api'

const setAuthHeader = (request: Request, token: string) => {
	request.headers.set('Authorization', `bearer ${token}`)
}

export const useAPI = () => {
	const { accessToken, refreshToken } = useAuth()

	const authApi = api.extend({
		hooks: {
			beforeRequest: [
				async (request) => {
					if (accessToken) setAuthHeader(request, accessToken)
					return request
				}
			],
			afterResponse: [
				async (request, _, response) => {
					if (response.status !== 401) return response
					const res = await refreshToken()
					setAuthHeader(request, res.accessToken)
					return api(request)
				}
			]
		}
	})

	return { api: authApi }
}
