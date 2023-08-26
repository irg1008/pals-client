'use server'

import { cookies } from 'next/headers'

export const isLogged = () => {
  const isLoggedCookie = cookies().get('is_logged')
  return isLoggedCookie?.value === 'true'
}
