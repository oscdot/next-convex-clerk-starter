import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  messages: defineTable({
    body: v.string(),
    channelId: v.id('channels'),
    authorId: v.id('users'),
  }).index('by_channel', ['channelId']),
  channels: defineTable({
    name: v.string(),
    members: v.optional(v.array(v.string())),
  }),
  users: defineTable({
    username: v.string(),
    tokenIdentifier: v.string(),
  }).index('by_token', ['tokenIdentifier']),
})
