import React from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import ChatPreview from '~/components/chat-preview'
import chatsQuery from '~/graphql/queries/chats'
import goToChannel from '~/utils/go-to-channel'

export default function Chats() {
  const { query } = useRouter()
  const { data, loading } = useQuery(chatsQuery)

  if (loading) {
    return null
  }

  return data.chats.map(chat => {
    const { channelName, channelType } = chat

    function onNavigate() {
      goToChannel(channelType, channelName)
    }

    return (
      <ChatPreview
        key={chat.id}
        chat={chat}
        tabIndex="0"
        selected={query.channelName === channelName}
        onClick={onNavigate}
        onKeyPress={onNavigate}
      />
    )
  })
}
