import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import eslint from 'vite-plugin-eslint'
import generouted from '@generouted/react-router/plugin'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	return {
		plugins: [
			react(),
			eslint(),
			generouted({
				source: {
					routes: './app/src/pages/**/[\\w[-]*.{jsx,tsx}',
					modals: './app/src/pages/**/[+]*.{jsx,tsx}'
				},
				output: './app/src/router.ts'
			})
		],
		root: 'app',
		server: {
			open: false,
			proxy: { '/api': env.API_URL },
			port: env.PORT
		},
		resolve: {
			alias: { '@': path.resolve(__dirname, './app/src') }
		},
		define: {
			__APP_ENV__: JSON.stringify(env.APP_ENV)
		}
	}
})
