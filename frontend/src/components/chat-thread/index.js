import React from 'react'
import { Box } from '@xstyled/styled-components'
import { MessageRow } from './elements'
import Avatar from '../avatar'

function Message({ content, author, isOneOfMine }) {
  return (
    <MessageRow
      display="flex"
      px="3"
      justifyContent={isOneOfMine ? 'flex-end' : 'flex-start'}
    >
      {!isOneOfMine && (
        <Box mr="2">
          <Avatar nickname={author.nickname} size="tiny" />
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
      >
        {content}
      </Box>
    </MessageRow>
  )
}

export default function ChatThread({ messages }) {
  return (
    <Box flex="1" overflow="auto" minHeight="0px">
      {messages.map((message, i) => (
        <Message key={message.id} isOneOfMine={i % 2 === 0} {...message} />
      ))}
    </Box>
  )
}
