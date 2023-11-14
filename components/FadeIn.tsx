'use client'
import { cn } from '@/lib/utils'
import { FC, useEffect, useState } from 'react'

interface FadeInProps {
  when: boolean
  children: React.ReactNode
}

const FadeIn: FC<FadeInProps> = ({ when, children }) => {
  const [shouldFade, setShouldFade] = useState(false)

  useEffect(() => {
    if (when === undefined || when === null) return
    setTimeout(() => {
      setShouldFade(true)
    }, 50)
  }, [when])
  return (
    <div
      className={cn(
        'opacity-0 transition-all duration-300',
        shouldFade && 'opacity-100'
      )}
    >
      {children}
    </div>
  )
}

export default FadeIn
