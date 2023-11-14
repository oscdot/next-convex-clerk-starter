import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { FC, useRef } from 'react'

interface MessageFormProps {
  channelId: string
}

const MessageForm: FC<MessageFormProps> = ({ channelId }) => {
  const form = useRef<HTMLFormElement>(null)

  const sendMessage = useMutation(api.messages.send)

  const onSubmit = async (formData: FormData) => {
    const body = formData.get('body') as string

    // Check if body is empty
    if (!body || body.length <= 1) return

    // Send message
    await sendMessage({
      channelId,
      body,
    })

    // Clear form
    form.current?.reset()
  }

  return (
    <form ref={form} action={onSubmit} className="flex space-x-2">
      <Input type="text" name="body" className="flex-1" />
      <Button>Send</Button>
    </form>
  )
}

export default MessageForm
