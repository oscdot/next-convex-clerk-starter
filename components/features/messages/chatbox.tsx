'use client'
import FadeIn from '@/components/FadeIn'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { cn, convertUnixToTimestamp } from '@/lib/utils'
import { useQuery } from 'convex/react'
import { FC, useEffect, useState } from 'react'

type MessageListProps = {
  channelId: Id<'channels'>
}

const MessageList: FC<MessageListProps> = ({ channelId }) => {
  const messages = useQuery(api.messages.getAllWithAuthors, { channelId })
  const [fadeIn, setFadeIn] = useState(false)

  const fadeInMessages = async () => {
    await new Promise((resolve) => setTimeout(resolve, 50))
    setFadeIn(true)
  }

  useEffect(() => {
    if (messages === undefined) return
    fadeInMessages()
  }, [messages])

  if (messages === undefined) return null

  if (messages.length === 0)
    return (
      <div
        className={cn(
          'flex h-screen items-center justify-center opacity-0 transition-all duration-500',
          fadeIn && 'opacity-100'
        )}
      >
        It&apos;s so empty here... maybe send a message?
      </div>
    )

  return (
    <FadeIn when={messages !== undefined}>
      {messages.map((message) => {
        return (
          <div key={message?._id} className="flex items-center space-x-1 p-2">
            <h2>{message.author?.username}</h2>
            <small className="">
              {convertUnixToTimestamp(message._creationTime)}
            </small>
            <p>{message.body}</p>
          </div>
        )
      })}
    </FadeIn>
  )
}

export default MessageList
