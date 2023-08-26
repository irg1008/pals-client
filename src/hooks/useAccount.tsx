import { parse } from '@/lib/api'
import { UserDTO } from '@/lib/dto'
import useSWR from 'swr'
import { useAPI } from './useAPI'

export const useAccount = () => {
  const { api } = useAPI()

  const getUser = async () => {
    const res = api.get('auth/me')
    const { data } = await parse<UserDTO>(res)
    return data
  }

  const { data, isLoading } = useSWR('user', getUser)

  return { user: data, isLoading }
}
