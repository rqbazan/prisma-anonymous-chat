import React from 'react'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/react-hooks'
import getChatQuery from '~/graphql/queries/get-chat'
import sendMessageMutation from '~/graphql/mutations/send-message'
import ChatHeader from '~/components/chat-header'
import ChatInput from '~/components/chat-input'
import ChatThread from '~/components/chat-thread'
import getDisplayName from '~/utils/get-channel-display-name'

export default function Chat() {
  const {
    query: { userId, channelName, channelType }
  } = useRouter()

  const { data, loading } = useQuery(getChatQuery, {
    variables: { channelName, channelType }
  })

  const [sendMessage] = useMutation(sendMessageMutation)

  return (
    <>
      <ChatHeader displayName={getDisplayName(channelName, channelType)} />
      <ChatThread
        loading={loading}
        meId={userId}
        messages={data?.chat?.messages ?? []}
      />
      <ChatInput
        onSend={content => {
          sendMessage({ variables: { content, channelType, channelName } })
        }}
      />
    </>
  )
}
