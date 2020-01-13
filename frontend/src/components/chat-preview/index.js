import React from 'react'
import {
  Container,
  MessageContent,
  MessengerNickName,
  InfoContainer
} from './elements'
import Avatar from '../avatar'

export default function ChatPreview({ chat, selected, ...props }) {
  return (
    <Container {...props} selected={selected}>
      <Avatar nickname={chat.displayName} />
      <InfoContainer>
        <MessengerNickName>{chat.displayName}</MessengerNickName>
        <MessageContent>{chat.lastMessage.content}</MessageContent>
      </InfoContainer>
    </Container>
  )
}

ChatPreview.Container = Container
