import { useQuery } from '@tanstack/react-query'
import { PropsWithChildren, createContext, useContext } from 'react'
import { isLogged } from './actions'

type AuthGuardStore = {
  isLogged?: boolean
  refecthIsLogged: () => void
}

const AuthContext = createContext<AuthGuardStore>({
  isLogged: false,
  refecthIsLogged: () => null
})

export const useAuthGuard = () => useContext(AuthContext)

export const AuthGuard = ({ children }: PropsWithChildren) => {
  const {
    isLoading,
    data: isUserLogged,
    refetch
  } = useQuery({
    queryKey: ['auth-guard'],
    queryFn: () => isLogged()
  })

  const refecthIsLogged = () => refetch()

  return (
    <AuthContext.Provider value={{ isLogged: isUserLogged, refecthIsLogged }}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}
