import {
  UserNullablePromise,
  Category,
  User,
  PrivateChat,
  GroupChat
} from '@prisma'
import { Resolver, Channel, ChannelType, WellKnowChat } from '~/types'

function toWellKnowChat(
  chat: PrivateChat | GroupChat,
  channelType: ChannelType
): WellKnowChat {
  return { ...chat, channelType }
}

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

  function sortDescByLastSentMessage(a: WellKnowChat, b: WellKnowChat) {
    return (
      new Date(b.lastSentMessageAt).getTime() -
      new Date(a.lastSentMessageAt).getTime()
    )
  }

  return [
    ...privateChats.map(chat => toWellKnowChat(chat, ChannelType.PRIVATE)),
    ...groupChats.map(chat => toWellKnowChat(chat, ChannelType.GROUP))
  ].sort(sortDescByLastSentMessage)
}

const getChat: Resolver<
  WellKnowChat | null,
  {},
  { channelName: string; channelType: ChannelType }
> = async (_, { channelName, channelType }, { userId, prisma }) => {
  let chat

  async function getPrivateChat() {
    const [privateChat] = await prisma.privateChats({
      where: {
        OR: [
          {
            participateA: { nickname: channelName },
            participateB: { id: userId }
          },
          {
            participateB: { nickname: channelName },
            participateA: { id: userId }
          }
        ]
      },
      first: 1
    })

    return privateChat
  }

  async function getGroupChat() {
    const [groupChat] = await prisma.groupChats({
      where: {
        category: { name: channelName }
      },
      first: 1
    })

    return groupChat
  }

  if (channelType === ChannelType.PRIVATE) {
    chat = await getPrivateChat()
  } else {
    chat = await getGroupChat()
  }

  if (!chat) {
    return null
  }

  return toWellKnowChat(chat, channelType)
}

export default {
  whoami,
  search,
  chats,
  getChat
}
