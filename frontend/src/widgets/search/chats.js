import React from 'react'
import Router, { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks'
import ChatPreview from '~/components/chat-preview'
import chatsQuery from '~/graphql/chats'

export default function Chats() {
  const router = useRouter()
  const { data, loading } = useQuery(chatsQuery)

  if (loading) {
    return null
  }

  return (
    <>
      {data.chats.map(({ channelName, channelType }) => {
        let chat

        if (channelType === 'p') {
          chat = {
            isPrivate: true,
            displayName: channelName,
            messenger: { nickname: channelName },
            lastMessage: { content: 'hello there my friend' }
          }
        } else {
          chat = {
            isPrivate: false,
            displayName: `#${channelName}`,
            category: { name: channelName },
            lastMessage: { content: 'hello there my friend' }
          }
        }

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
            key={channelName}
            chat={chat}
            selected={router.query.channelName === channelName}
            onClick={goToChannel}
          />
        )
      })}
    </>
  )
}
