import React from 'react'
import { Container, InfoContainer } from './elements'
import Ellipsis from '../ellipsis'
import Avatar from '../avatar'

export default function ChatPreview({ chat, selected, ...props }) {
  return (
    <Container {...props} selected={selected}>
      <Avatar nickname={chat.displayName} />
      <InfoContainer>
        <Ellipsis fontSize="1" fontWeight="medium">
          {chat.displayName}
        </Ellipsis>
        <Ellipsis color="gray.7" fontSize="0">
          {chat.lastMessage.content}
        </Ellipsis>
      </InfoContainer>
    </Container>
  )
}

ChatPreview.Container = Container
