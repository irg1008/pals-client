import { useAuth } from '@/stores/auth.store'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function AuthLayout() {
	const { isLogged } = useAuth()
	const navigate = useNavigate()

	// TODO: Think better the hole sheningan with auth guards etc

	useEffect(() => {
		if (isLogged) navigate('/')
	}, [isLogged, navigate])

	return <Outlet></Outlet>
}
