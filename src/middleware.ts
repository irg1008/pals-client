import { defaultLocale, locales } from '@/lib/config/locales'
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({ locales, defaultLocale })

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}

// TODO: Server actions not working with this middleware, returns 405 error on server action call.
