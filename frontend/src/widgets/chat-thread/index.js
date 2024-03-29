import React from 'react'
import { Box } from '@xstyled/styled-components'
import { useQuery } from '@apollo/react-hooks'
import getChatQuery from '~/graphql/queries/get-chat'
import CenterBox from '~/components/center-box'
import Loader from '~/components/loader'
import Avatar from '~/components/avatar'
import { MessageRow } from './elements'

function Message({ content, author, isOneOfMine }) {
  return (
    <MessageRow justifyContent={isOneOfMine ? 'flex-end' : 'flex-start'}>
      {!isOneOfMine && (
        <Box mr="2">
          <Avatar nickname={author.nickname} variant="tiny" />
        </Box>
      )}
      <Box
        display="inline-flex"
        maxWidth={{ xs: '60%', lg: '55%', xl: '40%' }}
        px="3"
        py="2"
        borderRadius="xl"
        color={isOneOfMine ? 'light' : 'dark'}
        backgroundColor={isOneOfMine ? 'indigo.5' : 'gray.3'}
        style={{ wordBreak: 'break-word' }}
      >
        {content}
      </Box>
    </MessageRow>
  )
}

function MessageList({ containerRef, messages }) {
  const mountedRef = React.useRef(false)
  const [showContent, setShowContent] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    containerRef.current.scrollTop = containerRef.current.scrollHeight
    if (!mountedRef.current) {
      setShowContent(true)
    }
    mountedRef.current = true
  }, [messages])

  return (
    <Box style={!showContent ? { visibility: 'hidden', opacity: 0 } : null}>
      {messages.map(message => (
        <Message key={message.id} {...message} />
      ))}
    </Box>
  )
}

export default function ChatThread({ channelName, channelType }) {
  const { data, loading } = useQuery(getChatQuery, {
    variables: { channelName, channelType },
    ssr: false
  })

  const containerRef = React.useRef()

  const messages = data?.chat?.messages ?? null
  const showContent = !loading && !!messages

  function renderContent() {
    if (showContent) {
      return <MessageList containerRef={containerRef} messages={messages} />
    }

    if (!loading && !data?.chat) {
      return (
        <CenterBox innerHeight={{ xs: '30%', sm: '40%', lg: '50%' }}>
          <img
            alt="no chat"
            src="https://res.cloudinary.com/dpwoyjb1f/image/upload/v1579219226/id-challenge/undraw_begin_chat_c6pj_unz8oc.svg"
          />
        </CenterBox>
      )
    }

    return (
      <CenterBox position="absolute" width="full" backgroundColor="white">
        <Loader dark size={32} />
      </CenterBox>
    )
  }

  return (
    <Box
      ref={containerRef}
      display="flex"
      flexDirection="column"
      flex="1"
      minHeight="0px"
      overflow={showContent ? 'auto' : 'hidden'}
      position="relative"
    >
      {renderContent()}
    </Box>
  )
}
