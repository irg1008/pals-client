'use client'

import { login } from '@/services/auth.service'
import { Button } from '@nextui-org/react'

export default function Home() {
	const handleLogin = () => {
		login('pepe@pepe.com', 'papaspapas2@')
	}

	return (
		<Button color="primary" onClick={handleLogin}>
			Login
		</Button>
	)
}
