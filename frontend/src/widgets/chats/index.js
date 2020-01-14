import React from 'react'
import Router, { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import ChatPreview from '~/components/chat-preview'
import chatsQuery from '~/graphql/queries/chats'

export default function Chats() {
  const router = useRouter()
  const { data, loading } = useQuery(chatsQuery)

  if (loading) {
    return null
  }

  return data.chats.map(chat => {
    const { channelName, channelType } = chat

    const goToChannel = () => {
      Router.push(
        {
          pathname: '/',
          query: {
            channelType,
            channelName,
            userId: router.query.userId
          }
        },
        `/${router.query.userId}/${channelType}/${channelName}`
      )
    }

    return (
      <ChatPreview
        key={chat.id}
        chat={chat}
        selected={router.query.channelName === channelName}
        onClick={goToChannel}
      />
    )
  })
}
