import { UserNullablePromise, Category, User } from '@prisma'
import { Resolver, Channel, ChannelType, WellKnowChat } from '~/types'

const whoami: Resolver<UserNullablePromise> = (_, { userId }, { prisma }) => {
  return prisma.user({ id: userId })
}

const search: Resolver<Channel[]> = async (
  _,
  { displayNameLike },
  { prisma }
) => {
  function channelMapper(type: ChannelType) {
    return (obj: Category | User): Channel => ({ ...obj, type })
  }

  if (displayNameLike.startsWith('#')) {
    const categories = await prisma.categories({
      where: { name_contains: displayNameLike.slice(1) },
      orderBy: 'name_ASC',
      first: 10
    })

    return categories.map(channelMapper(ChannelType.GROUP))
  }

  const [users, categories] = await Promise.all([
    prisma.users({
      where: { nickname_contains: displayNameLike },
      orderBy: 'nickname_ASC',
      first: 10
    }),
    prisma.categories({
      where: { name_contains: displayNameLike },
      orderBy: 'name_ASC',
      first: 10
    })
  ])

  return [
    ...users.map(channelMapper(ChannelType.PRIVATE)),
    ...categories.map(channelMapper(ChannelType.GROUP))
  ]
}

const chats: Resolver<WellKnowChat[]> = async (_, __, { userId, prisma }) => {
  const [privateChats, groupChats] = await Promise.all([
    prisma.privateChats({
      where: {
        // prettier-ignore
        OR: [
          { participateA: { id: userId } }, 
          { participateB: { id: userId } }
        ]
      }
    }),
    prisma.groupChats({
      where: {
        participates_some: { id: userId }
      }
    })
  ])

  return [
    ...privateChats.map(chat => ({ ...chat, type: ChannelType.PRIVATE })),
    ...groupChats.map(chat => ({ ...chat, type: ChannelType.GROUP }))
  ]
}

export default {
  whoami,
  search,
  chats
}
