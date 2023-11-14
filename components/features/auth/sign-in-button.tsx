'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SignInButton as ClerkSignInButton } from '@clerk/nextjs'
import { Button } from '../../ui/button'

export const SignInButton = () => {
  const [focused, setIsFocused] = useState(false)

  return (
    <ClerkSignInButton mode="modal">
      <Button
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
        variant="outline"
        className="rounded-full"
        size="icon"
      >
        <Lock
          className={cn(
            'h-4 w-4 text-slate-800 transition-all duration-300 dark:text-slate-400',
            focused ? 'rotate-12 text-slate-500' : 'rotate-0'
          )}
        />
      </Button>
    </ClerkSignInButton>
  )
}
