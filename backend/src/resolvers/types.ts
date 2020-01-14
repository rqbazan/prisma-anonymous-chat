import { GraphQLServerContext } from '~/types'

export default {
  Channel: {
    name: obj => (obj.type === 'p' ? obj.nickname : obj.name),
    displayName: obj => (obj.type === 'p' ? obj.nickname : `#${obj.name}`)
  },
  Message: {
    author: ({ id }, _, { prisma }: GraphQLServerContext) => {
      return prisma.message({ id }).author()
    }
  },
  Chat: {
    __resolveType: obj => (obj.private ? 'PrivateChat' : 'GroupChat')
  },
  GroupChat: {
    category: ({ id }, _, { prisma }) => prisma.groupChat({ id }).category(),
    messages: ({ id }, _, { prisma }: GraphQLServerContext) => {
      return prisma.messages({
        where: { chat: { id } },
        orderBy: 'createdAt_ASC'
      })
    }
  },
  PrivateChat: {
    participateA: ({ id }, _, { prisma }) => {
      return prisma.privateChat({ id }).participateA()
    },
    participateB: ({ id }, _, { prisma }) => {
      return prisma.privateChat({ id }).participateB()
    },
    messages: ({ id }, _, { prisma }: GraphQLServerContext) => {
      return prisma.messages({
        where: { chat: { id } },
        orderBy: 'createdAt_ASC'
      })
    }
  }
}
