import React from 'react'
import { Box } from '@xstyled/styled-components'
import CenterBox from '~/components/center-box'
import Loader from '~/components/loader'
import { MessageRow } from './elements'
import Avatar from '../avatar'

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

export default function ChatThread({ loading, meId, messages, ...props }) {
  const containerRef = React.useRef()

  React.useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight
  }, [messages])

  return (
    <Box ref={containerRef} flex="1" overflow="auto" minHeight="0px" {...props}>
      {loading ? (
        <CenterBox>
          <Loader dark size={32} />
        </CenterBox>
      ) : (
        messages.map(message => (
          <Message
            key={message.id}
            isOneOfMine={message.author.id === meId}
            {...message}
          />
        ))
      )}
    </Box>
  )
}
