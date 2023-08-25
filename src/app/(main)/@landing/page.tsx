'use client'

import { GradientTextProps, MultipleGradientText } from '@/components/ui/gradient-text'

export default function Landing() {
  const items: GradientTextProps[] = [
    {
      text: 'Meet.',
      className: 'bg-gradient-to-br via-primary-200 to-primary-600'
    },
    {
      text: 'Explore.',
      className: 'bg-gradient-to-bl via-secondary-200 to-secondary-600'
    },
    {
      text: 'Learn.',
      className: 'bg-gradient-to-br via-orange-300 to-orange-600'
    }
  ]

  return (
    <section className="flex flex-col gap-4">
      <header className="p-4 lg:p-12 xl:p-20">
        <MultipleGradientText
          items={items}
          as="h1"
          className="flex flex-col xl:flex-row justify-center text-5xl text-center sm:text-7xl lg:text-8xl items-center tracking-tight font-black z-10"
        />
      </header>
    </section>
  )
}
