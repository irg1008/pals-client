import { AuthGuard } from '@/guards/auth.guard'
import { Outlet } from 'react-router-dom'

export default function App() {
	return (
		<main className="dark bg-background text-foreground min-h-screen">
			<AuthGuard>
				<Outlet />
			</AuthGuard>
		</main>
	)
}
