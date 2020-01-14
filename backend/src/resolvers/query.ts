import {
  UserNullablePromise,
  Category,
  User,
  PrivateChat,
  GroupChat
} from '@prisma'
import { Resolver, Channel } from '~/types'

const whoami: Resolver<UserNullablePromise> = (_, { userId }, { prisma }) => {
  return prisma.user({ id: userId })
}

const search: Resolver<Channel[]> = async (
  _,
  { displayNameLike },
  { prisma }
) => {
  function channelMapper(type: 'p' | 'g') {
    return (obj: Category | User): Channel => ({ ...obj, type })
  }

  if (displayNameLike.startsWith('#')) {
    const categories = await prisma.categories({
      where: { name_contains: displayNameLike.slice(1) },
      orderBy: 'name_ASC',
      first: 10
    })

    return categories.map(channelMapper('g'))
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
    ...users.map(channelMapper('p')),
    ...categories.map(channelMapper('g'))
  ]
}

const chats: Resolver<(PrivateChat | GroupChat)[]> = async (
  _,
  __,
  { userId, prisma }
) => {
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
    ...privateChats.map(chat => ({ ...chat, private: true })),
    ...groupChats.map(chat => ({ ...chat, private: false }))
  ]
}

export default {
  whoami,
  search,
  chats
}
