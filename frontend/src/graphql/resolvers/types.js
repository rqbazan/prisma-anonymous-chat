import getSessionId from '~/utils/get-session-id'
import getDisplayName, { channelTypes } from '~/utils/get-channel-display-name'

const PrivateChatResolver = {
  displayName: (privateChat, _, { cache }) => {
    const sessionId = getSessionId(cache)

    let nickname

    if (privateChat.participateA.id === sessionId) {
      nickname = privateChat.participateB.nickname
    } else {
      nickname = privateChat.participateA.nickname
    }

    return getDisplayName(nickname, channelTypes.PRIVATE)
  }
}

const GroupChatResolver = {
  channelName: groupChat => groupChat.category.name,
  displayName: ({ category: { name } }) => {
    return getDisplayName(name, channelTypes.GROUP)
  }
}

const MessageResolver = {
  isOneOfMine: ({ author }, _, { cache }) => {
    const sessionId = getSessionId(cache)
    return author.id === sessionId
  }
}

export default {
  GroupChat: GroupChatResolver,
  Message: MessageResolver,
  PrivateChat: {
    ...PrivateChatResolver,
    channelName: PrivateChatResolver.displayName
  }
}
