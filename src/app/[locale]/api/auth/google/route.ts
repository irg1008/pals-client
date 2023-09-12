import { http } from '@/lib/api'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // TODO: Implement google tap sign
  const credParams = await request.formData()
  const jwt = credParams.get('credential')

  if (jwt) {
    http.get('auth/google/login', { searchParams: { token: jwt.toString() } })
    // redirect(`auth/google/login?token=${jwt.toString()}`)
  }

  return NextResponse.json({ message: 'Hello from /api/auth' })
}
