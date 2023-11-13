import { ModeToggle } from '@/components/design/mode-toggle'
import { UserButton } from '@/components/user-button'

export default function Home() {
  return (
    <>
      <nav className="flex justify-between p-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight transition-colors">
            ACME CO.
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <UserButton />
          <ModeToggle />
        </div>
      </nav>
      <main className="prose flex flex-col items-center p-10">
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight sm:text-4xl">
          Welcome to your Next.js app!
        </h1>
        <p className="mx-2 text-center leading-7 sm:mx-0 [&:not(:first-child)]:mt-6">
          A great starting point for building an app with{' '}
          <span className="underline underline-offset-4">
            Convex, Clerk & shadcn/ui
          </span>
        </p>
        <div className="mt-6 text-center">
          <h3 className="scroll-m-20 text-xl font-extrabold tracking-tight sm:text-3xl">
            Features
          </h3>
          <ul>
            <li>◼︎ Darkmode with next-themes</li>
            <li>◼︎ Better DX with ESlint & Prettier</li>
          </ul>
        </div>
        <p className="text-center leading-7 [&:not(:first-child)]:mt-6">
          Get started by changing the environment variables{' '}
          <code className="rounded-md bg-gray-100 px-2 py-1 font-mono text-sm text-gray-900">
            .env.local.example
          </code>
        </p>
        <p className="text-center leading-7 [&:not(:first-child)]:mt-6">
          Then try changing the content{' '}
          <code className="rounded-md bg-gray-100 px-2 py-1 font-mono text-sm text-gray-900">
            app/page.tsx
          </code>
        </p>
      </main>
    </>
  )
}
