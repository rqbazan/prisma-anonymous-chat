import getSessionId from '~/utils/get-session-id'

const PrivateChatResolver = {
  displayName: (privateChat, __, { cache }) => {
    const sessionId = getSessionId(cache)

    if (privateChat.participateA.id === sessionId) {
      return privateChat.participateB.nickname
    }

    return privateChat.participateA.nickname
  }
}

const GroupChatResolver = {
  channelName: groupChat => groupChat.category.name,
  displayName: groupChat => `#${groupChat.category.name}`
}

export default {
  GroupChat: GroupChatResolver,
  PrivateChat: {
    ...PrivateChatResolver,
    channelName: PrivateChatResolver.displayName
  }
}
