import { PropsWithChildren } from 'react'

export default function FormsLayout({ children }: PropsWithChildren) {
  return (
    <section className="h-full max-w-[400px] w-full mx-auto grid-rows-3 gap-6 grid">
      {children}
    </section>
  )
}
