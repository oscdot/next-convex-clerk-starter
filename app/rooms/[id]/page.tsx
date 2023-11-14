'use client'
import { FC } from 'react'
import { api } from '@/convex/_generated/api'
import { useStableQuery } from '@/hooks/useStableQuery'

import MessageForm from '@/components/features/messages/message-form'
import MessageList from '@/components/features/messages/chatbox'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type ChannelPageProps = {
  params: {
    id: string
  }
}

const ChannelPage: FC<ChannelPageProps> = ({ params }) => {
  const channel = useStableQuery(api.channels.get, { id: params.id })
  const router = useRouter()
  if (channel === null) {
    toast.error("You don't have access to this channel.")
    router.push('/')
    return null
  }

  if (channel === undefined) return null

  return (
    <main className="flex flex-col items-center">
      <div className="w-full space-y-2 px-10 md:w-2/3 xl:w-1/3">
        <h1 className="text-3xl font-semibold">{channel.name}</h1>
        <div className="flex h-[500px] flex-col overflow-y-auto rounded-lg border p-3">
          <MessageList channelId={channel._id} />
        </div>
        <MessageForm channelId={channel._id} />
      </div>
    </main>
  )
}

export default ChannelPage
