'use client'

import { AuthGuard } from '@/guards/auth.guard'
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextUIProvider>
			<QueryClientProvider client={queryClient}>
				<AuthGuard>{children}</AuthGuard>
			</QueryClientProvider>
		</NextUIProvider>
	)
}
