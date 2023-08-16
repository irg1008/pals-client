import { useAuth } from '@/stores/auth.store'
import { Button } from '@nextui-org/react'

export default function Login() {
	const { login } = useAuth()

	const handleLogin = async () => {
		await login('pepe@pepe.com', 'papaspapas2@')
	}

	return <Button onClick={handleLogin}>Log in</Button>
}
