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
  { content, receiverId, channelType },
  { userId, prisma }
) => {
  async function getPrivateChat() {
    const [privateChat] = await prisma.privateChats({
      where: {
        participateA: { id_in: [userId, receiverId] },
        participateB: { id_in: [userId, receiverId] }
      },
      first: 1
    })

    if (privateChat) {
      return privateChat
    }

    return prisma.createPrivateChat({
      participateA: { connect: { id: userId } },
      participateB: { connect: { id: receiverId } }
    })
  }

  async function getGroupChat() {
    const [groupChat] = await prisma.groupChats({
      where: {
        category: { id: receiverId },
        participates_some: { id: userId }
      },
      first: 1
    })

    if (groupChat) {
      return groupChat
    }

    return prisma.createGroupChat({
      category: { connect: { id: receiverId } },
      participates: { connect: { id: userId } }
    })
  }

  async function getChat() {
    if (channelType === 'p') {
      const privateChat = await getPrivateChat()

      const [chat] = await prisma.chats({
        where: { private: { id: privateChat.id } },
        first: 1
      })

      if (chat) {
        return chat
      }

      return prisma.createChat({
        private: { connect: { id: privateChat.id } }
      })
    }

    const groupChat = await getGroupChat()

    const [chat] = await prisma.chats({
      where: { group: { id: groupChat.id } },
      first: 1
    })

    if (chat) {
      return chat
    }

    return prisma.createChat({
      group: { connect: { id: groupChat.id } }
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
