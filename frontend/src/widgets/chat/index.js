import React from 'react'
import { useRouter } from 'next/router'
import ChatHeader from '~/components/chat-header'
import ChatInput from '~/components/chat-input'
import ChatThread from '~/components/chat-thread'

const chats = {
  ricardo: {
    isPrivate: true,
    displayName: 'ricardo',
    messenger: { nickname: 'ricardo' },
    lastMessage: { content: 'hello there my friend' },
    messages: Array.from({ length: 50 }).map((_, i) => ({
      content: 'hello there my friend',
      author: {
        nickname: 'sxntixgo'
      },
      id: `msg-${i}`
    }))
  },
  reactjs: {
    isPrivate: false,
    displayName: '#reactjs',
    category: { name: 'reactjs' },
    lastMessage: { content: 'hello there my friend' },
    messages: Array.from({ length: 50 }).map((_, i) => ({
      content: 'hello there my friend',
      author: {
        nickname: 'sxntixgo'
      },
      id: `msg-${i}`
    }))
  }
}

function getMockChat({ channelName, channelType }) {
  const isPrivate = channelType === 'p'

  const chat = isPrivate ? chats.ricardo : chats.reactjs

  if (isPrivate) {
    chat.displayName = channelName
  } else {
    chat.displayName = `#${channelName}`
  }

  return chat
}

export default function Chat() {
  const { query } = useRouter()

  const chat = getMockChat(query)

  return (
    <>
      <ChatHeader chat={chat} />
      <ChatThread messages={chat.messages} />
      <ChatInput />
    </>
  )
}
