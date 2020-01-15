import React from 'react'
import { Box } from '@xstyled/styled-components'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/react-hooks'
import getChatQuery from '~/graphql/queries/get-chat'
import sendMessageMutation from '~/graphql/mutations/send-message'
import ChatHeader from '~/components/chat-header'
import ChatInput from '~/components/chat-input'
import ChatThread from '~/components/chat-thread'
import Loader from '~/components/loader'
import getDisplayName from '~/utils/get-channel-display-name'

function ChatLoader() {
  return (
    <Box
      display="flex"
      flex="1"
      overflow="auto"
      minHeight="0px"
      alignItems="center"
      justifyContent="center"
    >
      <Loader dark size={32} />
    </Box>
  )
}

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
      {loading ? (
        <ChatLoader />
      ) : (
        <ChatThread meId={userId} messages={data?.chat?.messages ?? []} />
      )}
      <ChatInput
        onSend={content =>
          sendMessage({
            variables: {
              content,
              channelType,
              channelName
            }
          })
        }
      />
    </>
  )
}
