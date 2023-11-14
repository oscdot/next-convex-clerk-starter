'use client'
import { UserButton as ClerkUserButton } from '@clerk/nextjs'
import { AuthLoading, Authenticated, Unauthenticated } from 'convex/react'
import { SignInButton } from './sign-in-button'
import useStoreUserEffect from '@/hooks/useStoreUserEffect'

export const UserButton = () => {
  useStoreUserEffect()
  return (
    <div className="flex items-center justify-between space-x-2">
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <ClerkUserButton afterSignOutUrl="/" />
      </Authenticated>
      <AuthLoading>
        <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
      </AuthLoading>
    </div>
  )
}
