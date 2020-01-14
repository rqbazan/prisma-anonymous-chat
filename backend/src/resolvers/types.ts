import { User, PrivateChat, Category } from '@prisma'
import { Context, Channel, WellKnowChat, ChannelType } from '~/types'

function isUser(channel: any): channel is User {
  return (channel as Channel).type === ChannelType.PRIVATE
}

function isPrivateChat(wellKnowChat: any): wellKnowChat is PrivateChat {
  return (wellKnowChat as WellKnowChat).channelType === ChannelType.PRIVATE
}

const ChannelResolver = {
  name: (obj: Category | User) => {
    return isUser(obj) ? obj.nickname : obj.name
  },
  displayName: (obj: Category | User) => {
    return isUser(obj) ? obj.nickname : `#${obj.name}`
  }
}

const MessageResolver = {
  author: ({ id }, _, { prisma }: Context) => {
    return prisma.message({ id }).author()
  }
}

const ChatResolver = {
  __resolveType: (obj: WellKnowChat) => {
    return isPrivateChat(obj) ? 'PrivateChat' : 'GroupChat'
  },
  messages: ({ id }, _, { prisma }: Context) => {
    return prisma.messages({
      where: { chat: { id } },
      orderBy: 'createdAt_ASC'
    })
  },
  lastMessage: async ({ id }, _, { prisma }: Context) => {
    const [message] = await prisma.messages({
      where: { chat: { id } },
      orderBy: 'createdAt_DESC',
      first: 1
    })

    return message
  }
}

const GroupChatResolver = {
  ...ChatResolver,
  category: ({ id }, _, { prisma }: Context) => {
    return prisma.groupChat({ id }).category()
  }
}

const PrivateChatResolver = {
  ...ChatResolver,
  participateA: ({ id }, _, { prisma }: Context) => {
    return prisma.privateChat({ id }).participateA()
  },
  participateB: ({ id }, _, { prisma }: Context) => {
    return prisma.privateChat({ id }).participateB()
  }
}

export default {
  Channel: ChannelResolver,
  Message: MessageResolver,
  Chat: ChatResolver,
  GroupChat: GroupChatResolver,
  PrivateChat: PrivateChatResolver
}
