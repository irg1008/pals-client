'use client'

import { protectedRoute } from '@/lib/auth/actions'
// import { useAPI } from '@/hooks/useAPI'
import { Button } from '@nextui-org/react'
import toast from 'react-hot-toast'

export default function Example() {
  const fetchProtected = async () => {
    const { data } = await protectedRoute()
    if (data) toast.success(data.message)
    else toast.error('Something went wrong')
  }

  return <Button onClick={fetchProtected}>Test me man</Button>
}
