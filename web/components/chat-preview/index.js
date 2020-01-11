import React from 'react'
import { Box } from '@xstyled/styled-components'
import { Container, MessageContent, MessengerNickName } from './elements'
import Avatar from '../avatar'

function PrivateChatPreview({ chat, ...props }) {
  return (
    <Container {...props}>
      <Box flexShrink="0">
        <Avatar nickname={chat.messenger.nickname} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        flex="1"
        ml="2"
        overflow="hidden"
      >
        <MessengerNickName>{chat.messenger.nickname}</MessengerNickName>
        <MessageContent>
          {chat.lastMessage.content}
          {chat.lastMessage.content}
          {chat.lastMessage.content}
          {chat.lastMessage.content}
          {chat.lastMessage.content}
          {chat.lastMessage.content}
          {chat.lastMessage.content}
        </MessageContent>
      </Box>
    </Container>
  )
}

function GroupChatPreview({ chat, ...props }) {
  return (
    <Container {...props}>
      <Avatar nickname={chat.category.name} />
      <Box display="flex" flexDirection="column" flex="1" ml="2">
        <MessengerNickName>{chat.category.name}</MessengerNickName>
        <MessageContent>{chat.lastMessage.content}</MessageContent>
      </Box>
    </Container>
  )
}

export default function ChatPreview({ chat, ...props }) {
  if (chat.isPrivate) {
    return <PrivateChatPreview chat={chat} {...props} />
  }

  // otherwise, it's a group chat
  return <GroupChatPreview chat={chat} {...props} />
}
