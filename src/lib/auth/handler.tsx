import { authStore } from '@/stores/auth.store'
import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { useEffectOnce } from 'usehooks-ts'

export const AuthHandler = ({ children }: PropsWithChildren) => {
  const { refresh } = useRouter()

  useEffectOnce(() => {
    authStore.subscribe(({ accessToken: oldToken }, { accessToken: newToken }) => {
      // Refresh page to update logged state.
      if (oldToken !== newToken) refresh()
    })
  })

  return <>{children}</>
}
