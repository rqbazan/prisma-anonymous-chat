import React from 'react'
import { Box } from '@xstyled/styled-components'
import UserSection from '~/components/user-section'
import SearchBar from '~/components/search-bar'
import ChatPreview from '~/components/chat-preview'
// import UnselectedChat from '~/components/unselected-chat'
import ChatHeader from '~/components/chat-header'
import ChatInput from '~/components/chat-input'
import ChatThread from '~/components/chat-thread'

export default function IndexPage() {
  return (
    <Box display="flex" height="100vh">
      <Box
        display="flex"
        flexDirection="column"
        borderRight="1px solid"
        borderColor="gray.3"
        width={{ xs: '100%', md: '40%', lg: '30%', xl: '20%' }}
        backgroundColor="gray.1"
        zIndex="1"
      >
        <UserSection user={{ nickname: 'sxntixgo' }} />
        <Box p="3" pt="1">
          <SearchBar placeholder="Search any user or a #group" />
        </Box>
        <Box flex="1" overflow="auto" minHeight="0px">
          {Array.from({ length: 50 }).map((v, index) =>
            index % 2 ? (
              <ChatPreview
                isSelected={index === 0}
                chat={{
                  isPrivate: true,
                  messenger: { nickname: 'ricardo' },
                  lastMessage: { content: 'hello there my friend' }
                }}
              />
            ) : (
              <ChatPreview
                isSelected={index === 0}
                chat={{
                  isPrivate: false,
                  category: { name: '#reactjs' },
                  lastMessage: { content: 'hello there my friend' }
                }}
              />
            )
          )}
        </Box>
      </Box>
      <Box
        display={{ xs: 'none', md: 'flex' }}
        flexDirection="column"
        width={{ xs: '100%', md: '60%', lg: '70%', xl: '80%' }}
      >
        {/* <UnselectedChat /> */}
        <ChatHeader
          chat={{
            isPrivate: false,
            category: { name: '#reactjs' },
            lastMessage: { content: 'hello there my friend' }
          }}
        />
        <ChatThread
          messages={Array.from({ length: 50 }).map((_, i) => ({
            content:
              'hello there my friend hello there my friend hello there my friend hello there my friend hello there my friend hello there my friend hello there my friend',
            author: {
              nickname: 'sxntixgo'
            },
            id: `msg-${i}`
          }))}
        />
        <ChatInput />
      </Box>
    </Box>
  )
}
