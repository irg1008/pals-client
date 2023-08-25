'use client'

import { useAPI } from '@/hooks/useAPI'
import { parse } from '@/lib/api'
import { Button } from '@nextui-org/react'
import toast from 'react-hot-toast'

export default function Example() {
  const { api } = useAPI()

  const fetchProtected = async () => {
    const response = api.get('protected')
    const { data, error } = await parse<{ message: string }>(response)
    const msg = data?.message ?? error?.message
    if (msg) toast.success(msg)
  }

  return <Button onClick={fetchProtected}>Test me man</Button>
}
