import React from 'react'
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

export default function Chat({ chatName }) {
  const chat = chats[chatName] || chats.ricardo

  return (
    <>
      <ChatHeader chat={chat} />
      <ChatThread messages={chat.messages} />
      <ChatInput />
    </>
  )
}
