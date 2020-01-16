import React from 'react'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/react-hooks'
import getChatQuery from '~/graphql/queries/get-chat'
import chatsQuery from '~/graphql/queries/chats'
import sendMessageMutation from '~/graphql/mutations/send-message'
import ChatHeader from '~/components/chat-header'
import ChatInput from '~/components/chat-input'
import ChatThread from '~/components/chat-thread'
import getDisplayName from '~/utils/get-channel-display-name'

export default function Chat({ user }) {
  const {
    query: { userId, channelName, channelType }
  } = useRouter()

  const { data, loading } = useQuery(getChatQuery, {
    variables: { channelName, channelType }
  })

  const [sendMessage] = useMutation(sendMessageMutation)

  function onSendMessage(content) {
    const optimisticResponse = {
      __typename: 'Mutation',
      sendMessage: {
        id: Math.floor(Math.random() * 1000000000),
        content,
        __typename: 'Message',
        author: {
          __typename: 'User',
          ...user
        }
      }
    }

    function update(cache, response) {
      const newMessage = response.data.sendMessage

      try {
        const { chat } = cache.readQuery({
          query: getChatQuery,
          variables: { channelName, channelType }
        })

        const newChat = {
          ...chat,
          messages: [...chat.messages, newMessage]
        }

        cache.writeQuery({
          query: getChatQuery,
          data: { chat: newChat }
        })

        const { chats } = cache.readQuery({
          query: chatsQuery
        })

        const chatIndex = chats.findIndex(({ id }) => id === chat.id)

        const newChats = [
          { ...chats[chatIndex], lastMessage: newMessage },
          ...chats.slice(0, chatIndex),
          ...chats.slice(chatIndex + 1)
        ]

        cache.writeQuery({
          query: chatsQuery,
          data: { chats: newChats }
        })
      } catch (error) {
        console.error(error)
      }
    }

    sendMessage({
      optimisticResponse,
      update,
      variables: { content, channelType, channelName }
    })
  }

  return (
    <>
      <ChatHeader displayName={getDisplayName(channelName, channelType)} />
      <ChatThread
        loading={loading}
        meId={userId}
        messages={data?.chat?.messages ?? []}
      />
      <ChatInput onSend={onSendMessage} />
    </>
  )
}
