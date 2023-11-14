import { ModeToggle } from '@/components/layout/mode-toggle'
import { UserButton } from '@/components/features/auth/user-button'
import Link from 'next/link'

const MainNav = () => {
  return (
    <nav className="flex justify-between p-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight transition-colors">
          CHATS
        </h2>
      </div>
      <ul className="flex items-center space-x-4 font-semibold">
        <li>
          <Link href="/">Rooms</Link>
        </li>
      </ul>
      <div className="flex items-center space-x-2">
        <UserButton />
        <ModeToggle />
      </div>
    </nav>
  )
}

export default MainNav
