import { v } from 'convex/values'
import { QueryCtx, mutation, query } from './_generated/server'
import { Doc } from './_generated/dataModel'

export const getAllWithAuthors = query({
  args: { channelId: v.id('channels') },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query('messages')
      .withIndex('by_channel', (q) => q.eq('channelId', args.channelId))
      .order('desc')
      .take(12)

    const enrichedResult = (await enrichWithAuthors(ctx, result)).reverse()
    if (enrichedResult === null) return []
    return enrichedResult
  },
})

async function enrichWithAuthors(ctx: QueryCtx, messages: Doc<'messages'>[]) {
  // Iterate over our messages, and fetch the author for each one.
  const enrichedMessages = await Promise.all(
    messages.map(async (message) => {
      const author = await ctx.db.get(message.authorId)
      return { ...message, author }
    })
  ).then((messages) => messages.filter((message) => message.author !== null))
  if (enrichedMessages.length === 0) return []
  return enrichedMessages
}

export type MessagesWithAuthors = Awaited<ReturnType<typeof enrichWithAuthors>>

export const send = mutation({
  args: {
    channelId: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Called storeUser without authentication present')
    }

    // Check if we've already stored this identity before.
    const user = await ctx.db
      .query('users')
      .withIndex('by_token', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .unique()

    if (!user) return false

    // Normalize the channel ID.
    const channelId = ctx.db.normalizeId('channels', args.channelId)

    // Check if the channel exists, if not we return.
    if (!channelId) return

    // Create the message.
    const messageId = await ctx.db.insert('messages', {
      channelId,
      body: args.body,
      authorId: user._id,
    })

    return messageId
  },
})
