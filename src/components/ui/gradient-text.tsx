import { HTMLProps, ReactHTML, createElement, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import { useCounter, useInterval } from 'usehooks-ts'

export type GradientTextProps = {
  text: string
  className?: string
  active?: boolean
}

type MultipleGradientTextProps<K extends keyof ReactHTML> = {
  items: GradientTextProps[]
  delay?: number
  as?: K
  onItemChange?: (index: number) => void
}

export const MultipleGradientText = <K extends keyof ReactHTML>({
  items,
  as,
  delay = 3000,
  onItemChange,
  ...props
}: MultipleGradientTextProps<K> & HTMLProps<K>) => {
  const { increment, count, reset } = useCounter(0)

  useInterval(() => {
    count === items.length - 1 ? reset() : increment()
  }, delay)

  useEffect(() => {
    onItemChange?.(count)
  }, [count, onItemChange])

  return createElement(
    as ?? 'div',
    props,
    items.map((item, index) => <GradientText key={index} {...item} active={index === count} />)
  )
}

export const GradientText = ({ text, className, active = true }: GradientTextProps) => (
  <span
    aria-label={text}
    className={twMerge(
      className,
      'transition-transform-background !duration-[2s] ease-soft-spring [background-size:100%_200%] bg-no-repeat pb-2',
      'bg-clip-text relative drop-shadow-xl text-transparent from-foreground from-0% via-20% to-100%',
      'before:content-[attr(aria-label)] before:!duration-[2s] before:transition-opacity before:ease-soft-spring before:absolute before:top-0 before:left-0 before:text-foreground',
      active
        ? 'before:opacity-0 [background-position-y:100%]'
        : 'before:opacity-100 [background-position-y:0%]'
    )}
  >
    {text}
  </span>
)
