import React from 'react'
import {
  Container,
  MessageContent,
  MessengerNickName,
  InfoContainer
} from './elements'
import Avatar from '../avatar'

export default function ChatPreview({ chat, isSelected, ...props }) {
  return (
    <Container {...props} isSelected={isSelected}>
      <Avatar nickname={chat.displayName} />
      <InfoContainer>
        <MessengerNickName>{chat.displayName}</MessengerNickName>
        <MessageContent>{chat.lastMessage.content}</MessageContent>
      </InfoContainer>
    </Container>
  )
}

ChatPreview.Container = Container
