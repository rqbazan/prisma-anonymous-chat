import getSessionId from '~/utils/get-session-id'
import getDisplayName, { channelTypes } from '~/utils/get-channel-display-name'

const PrivateChatResolver = {
  displayName: (privateChat, __, { cache }) => {
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

export default {
  GroupChat: GroupChatResolver,
  PrivateChat: {
    ...PrivateChatResolver,
    channelName: PrivateChatResolver.displayName
  }
}
