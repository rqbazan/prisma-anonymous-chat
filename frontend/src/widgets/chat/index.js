import React from 'react'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/react-hooks'
import getChatQuery from '~/graphql/queries/get-chat'
import chatsQuery from '~/graphql/queries/chats'
import sendMessageMutation from '~/graphql/mutations/send-message'
import ChatHeader from '~/components/chat-header'
import ChatInput from '~/components/chat-input'
import ChatThread from '~/components/chat-thread'
import getDisplayName, { channelTypes } from '~/utils/get-channel-display-name'
import getRandomOptimisticId from '~/utils/get-random-optimistic-id'

export default function Chat({ user }) {
  const {
    query: { channelName, channelType }
  } = useRouter()

  const displayName = getDisplayName(channelName, channelType)

  const { data, loading } = useQuery(getChatQuery, {
    variables: { channelName, channelType }
  })

  const [sendMessage] = useMutation(sendMessageMutation)

  function onSendMessage(content) {
    const optimisticResponse = {
      __typename: 'Mutation',
      sendMessage: {
        id: getRandomOptimisticId(),
        content,
        isOneOfMine: true,
        __typename: 'Message',
        author: {
          __typename: 'User',
          ...user
        }
      }
    }

    function update(cache, response) {
      const newMessage = response.data.sendMessage

      function getNewChat(chat) {
        if (chat) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage]
          }
        }

        return {
          displayName,
          id: getRandomOptimisticId(),
          messages: [newMessage],
          __typename:
            channelType === channelTypes.PRIVATE ? 'PrivateChat' : 'GroupChat',
          ...(channelType !== channelTypes.PRIVATE
            ? {
                category: {
                  __typename: 'Category',
                  id: getRandomOptimisticId(),
                  name: channelName
                }
              }
            : {
                participateA: {
                  __typename: 'User',
                  id: getRandomOptimisticId(),
                  nickname: user.nickname
                },
                participateB: {
                  __typename: 'User',
                  id: getRandomOptimisticId(),
                  nickname: channelName
                }
              })
        }
      }

      function getNewChats(chats, newChat, chat) {
        const chatIndex = chats.findIndex(({ id }) => id === chat?.id)
        const found = chatIndex !== -1

        return [
          {
            ...(found
              ? chats[chatIndex]
              : { ...newChat, channelType, channelName }),
            lastMessage: newMessage
          },
          ...(found
            ? [...chats.slice(0, chatIndex), ...chats.slice(chatIndex + 1)]
            : chats)
        ]
      }

      try {
        const { chat } = cache.readQuery({
          query: getChatQuery,
          variables: { channelName, channelType }
        })

        const newChat = getNewChat(chat)

        cache.writeQuery({
          query: getChatQuery,
          variables: { channelName, channelType },
          data: { chat: newChat }
        })

        const { chats } = cache.readQuery({
          query: chatsQuery
        })

        const newChats = getNewChats(chats, newChat, chat)

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
      <ChatHeader displayName={displayName} />
      <ChatThread loading={loading} messages={data?.chat?.messages ?? []} />
      <ChatInput onSend={onSendMessage} />
    </>
  )
}
