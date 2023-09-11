import { GradientTextProps, MultipleGradientText } from '@/components/ui/gradient-text'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const Header = () => {
  const [activeIndex, setActiveIndex] = useState(0)

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

  const activeColor = ['bg-primary-600', 'bg-secondary-600', 'bg-orange-600']
  return (
    <header className="p-4 lg:p-12 xl:p-20 relative">
      <span
        className={twMerge(
          'transition-colors ease-in-out !duration-1000 blur-3xl absolute top-0 left-0 w-full h-full delay-100 rounded-full opacity-10 scale-75 scale-x-50',
          activeColor[activeIndex]
        )}
      />

      <MultipleGradientText
        items={items}
        onItemChange={setActiveIndex}
        as="h1"
        className="flex flex-col xl:flex-row justify-center text-5xl text-center sm:text-7xl lg:text-8xl items-center tracking-tight font-black z-10"
      />
    </header>
  )
}
