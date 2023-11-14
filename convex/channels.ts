import { v } from 'convex/values'
import { query } from './_generated/server'

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('channels').collect()
  },
})

export const get = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Get identity of the current user.
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return undefined

    // Check if we've already stored this identity before.
    const user = await ctx.db
      .query('users')
      .withIndex('by_token', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .unique()

    if (!user) return undefined

    const channelId = ctx.db.normalizeId('channels', args.id)

    if (!channelId) return
    const channel = await ctx.db.get(channelId)

    if (channel && channel.members) {
      const canAccess = channel.members.includes(user._id)
      if (!canAccess) return null
    }

    return channel
  },
})
