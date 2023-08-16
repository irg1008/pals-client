import { Path } from '@/router'
import { useAuth } from '@/stores/auth.store'
import { PropsWithChildren } from 'react'
import { useEffectOnce } from 'usehooks-ts'

type AuthProps = {
	redirectTo?: Path
}

export const AuthGuard = ({ children, redirectTo }: PropsWithChildren<AuthProps>) => {
	const { refreshToken } = useAuth({
		redirectTo
	})

	useEffectOnce(() => {
		refreshToken()
	})

	return <>{children}</>
}
