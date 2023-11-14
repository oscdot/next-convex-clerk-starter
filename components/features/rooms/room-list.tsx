'use client'
import FadeIn from '@/components/FadeIn'
import { api } from '@/convex/_generated/api'
import { useStableQuery } from '@/hooks/useStableQuery'
import { cn } from '@/lib/utils'
import { Lock } from 'lucide-react'
import Link from 'next/link'

export const RoomList = () => {
  const channel = useStableQuery(api.channels.list)
  if (channel === undefined) return null

  return (
    <div className="w-full">
      <FadeIn when={channel !== undefined}>
        <h1 className="border-b text-3xl font-semibold">Rooms</h1>
        <div className="flex flex-col space-y-1">
          {channel.map((channel, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <Link
                href={`/rooms/${channel._id}`}
                className={cn(
                  'flex items-center text-xl font-medium text-muted-foreground hover:underline'
                )}
              >
                {channel.name}
              </Link>
              {channel.members && <Lock className="h-4 w-4 text-slate-400" />}
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  )
}
