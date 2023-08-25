import { parse } from '@/lib/api'
import { UserDTO } from '@/lib/dto'
import { useQuery } from '@tanstack/react-query'
import { useAPI } from './useAPI'

export const useAccount = () => {
  const { api } = useAPI()

  const getUser = async () => {
    const res = api.get('auth/me')
    const { data } = await parse<UserDTO>(res)
    return data
  }

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: Infinity
  })

  return { user: data, isLoading }
}
