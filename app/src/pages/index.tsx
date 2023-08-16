import { useAPI } from '@/hooks/useAPI'
import { Link } from '@/router'
import { useAuth } from '@/stores/auth.store'
import { Button, ButtonGroup } from '@nextui-org/react'

export default function Home() {
	const { logout, isLogged } = useAuth()
	const { api } = useAPI()

	const getProtected = async () => {
		const res = await api.get('protected').text()
		console.log(res)
	}

	return (
		<div className="grid place-content-center h-screen">
			{isLogged ? 'Logged in' : 'Not logged in'}
			{isLogged ? (
				<ButtonGroup>
					<Button onClick={getProtected}>Protected</Button>
					<Button onClick={logout}>Log Out</Button>
				</ButtonGroup>
			) : (
				<Link to="/login">Log In</Link>
			)}
		</div>
	)
}
