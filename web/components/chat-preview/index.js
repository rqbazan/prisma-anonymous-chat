import React from 'react'
import {
  Container,
  MessageContent,
  MessengerNickName,
  InfoContainer
} from './elements'
import Avatar from '../avatar'

function PrivateChatPreview({ chat, isSelected, ...props }) {
  return (
    <Container {...props} isSelected={isSelected}>
      <Avatar nickname={chat.messenger.nickname} />
      <InfoContainer>
        <MessengerNickName>{chat.messenger.nickname}</MessengerNickName>
        <MessageContent>{chat.lastMessage.content}</MessageContent>
      </InfoContainer>
    </Container>
  )
}

function GroupChatPreview({ chat, isSelected, ...props }) {
  return (
    <Container {...props} isSelected={isSelected}>
      <Avatar nickname={chat.category.name} />
      <InfoContainer>
        <MessengerNickName>{chat.category.name}</MessengerNickName>
        <MessageContent>{chat.lastMessage.content}</MessageContent>
      </InfoContainer>
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
