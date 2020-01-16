import { UserNullablePromise, Message } from '@prisma'
import { Resolver } from '~/types'

const updateUser: Resolver<UserNullablePromise> = (
  _,
  { nickname },
  { userId, prisma }
) => {
  return prisma.updateUser({
    data: { nickname },
    where: { id: userId }
  })
}

const sendMessage: Resolver<Message> = async (
  _,
  { content, channelName, channelType },
  { userId, prisma }
) => {
  async function getPrivateChat() {
    const [privateChat] = await prisma.privateChats({
      where: {
        OR: [
          {
            participateA: { id: userId },
            participateB: { nickname: channelName }
          },
          {
            participateA: { nickname: channelName },
            participateB: { id: userId }
          }
        ]
      },
      first: 1
    })

    if (privateChat) {
      await prisma.updatePrivateChat({
        data: { lastSentMessageAt: new Date() },
        where: { id: privateChat.id }
      })

      return privateChat
    }

    return prisma.createPrivateChat({
      lastSentMessageAt: new Date(),
      participateA: { connect: { id: userId } },
      participateB: { connect: { nickname: channelName } }
    })
  }

  async function getGroupChat() {
    const [groupChat] = await prisma.groupChats({
      where: {
        category: { name: channelName }
      },
      first: 1
    })

    if (groupChat) {
      await prisma.updateGroupChat({
        where: { id: groupChat.id },
        data: {
          lastSentMessageAt: new Date(),
          participates: { connect: { id: userId } }
        }
      })

      return groupChat
    }

    return prisma.createGroupChat({
      lastSentMessageAt: new Date(),
      category: { connect: { name: channelName } },
      participates: { connect: { id: userId } }
    })
  }

  async function getChat() {
    if (channelType === 'p') {
      const privateChat = await getPrivateChat()

      const [chat] = await prisma.chats({
        where: { id: privateChat.id },
        first: 1
      })

      if (chat) {
        return chat
      }

      return prisma.createChat({
        id: privateChat.id,
        type: 'PRIVATE'
      })
    }

    const groupChat = await getGroupChat()

    const [chat] = await prisma.chats({
      where: { id: groupChat.id },
      first: 1
    })

    if (chat) {
      return chat
    }

    return prisma.createChat({
      id: groupChat.id,
      type: 'GROUP'
    })
  }

  const chat = await getChat()

  const message = await prisma.createMessage({
    content,
    author: { connect: { id: userId } },
    chat: { connect: { id: chat.id } }
  })

  return message
}

export default {
  updateUser,
  sendMessage
}
