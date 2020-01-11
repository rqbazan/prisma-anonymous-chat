import React from 'react'
import { Box } from '@xstyled/styled-components'
import UserSection from '~/components/user-section'
import SearchBar from '~/components/search-bar'
import ChatPreview from '~/components/chat-preview'

export default function IndexPage() {
  return (
    <Box display="flex" height="100vh">
      <Box
        display="flex"
        flexDirection="column"
        borderRight="1px solid"
        borderColor="gray.3"
        width="20%"
        backgroundColor="gray.1"
      >
        <UserSection user={{ nickname: 'sxntixgo' }} />
        <Box p="3" pt="1">
          <SearchBar placeholder="Search any user or a #group" />
        </Box>
        <Box flex="1" overflow="auto" minHeight="0px">
          {Array.from({ length: 50 }).map((v, index) =>
            index % 2 ? (
              <ChatPreview
                chat={{
                  isPrivate: true,
                  messenger: { nickname: 'ricardo' },
                  lastMessage: { content: 'hello there my friend' }
                }}
              />
            ) : (
              <ChatPreview
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
      <Box display="flex" width="80%" />
    </Box>
  )
}
