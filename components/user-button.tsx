'use client'
import { UserButton as ClerkUserButton } from '@clerk/nextjs'
import { AuthLoading, Authenticated, Unauthenticated } from 'convex/react'
import { SignInButton } from './sign-in-button'

export const UserButton = () => (
  <div className="flex items-center justify-center">
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
