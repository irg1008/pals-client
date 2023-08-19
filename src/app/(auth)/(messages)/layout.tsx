import { PropsWithChildren } from 'react'

export default function SignUpCompleted({ children }: PropsWithChildren) {
  return (
    <div className="grid place-content-center justify-items-center h-screen gap-4 text-center">
      {children}
    </div>
  )
}
