import React from 'react'
import Link from 'next/link'
import { Box } from '@xstyled/styled-components'
import withApollo from '~/hocs/with-apollo'
import SearchBar from '~/components/search-bar'
import ChatPreview from '~/components/chat-preview'
import UnselectedChat from '~/components/unselected-chat'
import UserSection from '~/widgets/user-section'
import Chat from '~/widgets/chat'
import whoamiQuery from '~/graphql/whoami'

function IndexPage({ chatName, me }) {
  return (
    <Box display="flex" height="100vh">
      <Box
        display={{ xs: chatName ? 'none' : 'flex', md: 'flex' }}
        flexDirection="column"
        borderRight="1px solid"
        borderColor="gray.3"
        width={{ xs: '100%', md: '40%', lg: '30%', xl: '20%' }}
        backgroundColor="gray.1"
        zIndex="1"
      >
        <UserSection user={me} />
        <Box p="3" pt="1">
          <SearchBar placeholder="Search any user or a #group" />
        </Box>
        <Box flex="1" overflow="auto" minHeight="0px">
          {Array.from({ length: 50 }).map((v, index) => (
            <Link
              scroll={false}
              href={{
                pathname: '/',
                query: {
                  chatName: index % 2 ? 'ricardo' : 'reactjs',
                  userId: me.id
                }
              }}
              as={index % 2 ? `/${me.id}/ricardo` : `/${me.id}/reactjs`}
            >
              {index % 2 ? (
                <ChatPreview
                  isSelected={chatName === 'ricardo'}
                  chat={{
                    isPrivate: true,
                    displayName: 'ricardo',
                    messenger: { nickname: 'ricardo' },
                    lastMessage: { content: 'hello there my friend' }
                  }}
                />
              ) : (
                <ChatPreview
                  isSelected={chatName === 'reactjs'}
                  chat={{
                    isPrivate: false,
                    displayName: '#reactjs',
                    category: { name: 'reactjs' },
                    lastMessage: { content: 'hello there my friend' }
                  }}
                />
              )}
            </Link>
          ))}
        </Box>
      </Box>
      <Box
        display={{
          xs: chatName ? 'flex' : 'none',
          md: 'flex'
        }}
        flexDirection="column"
        width={{ xs: '100%', md: '60%', lg: '70%', xl: '80%' }}
      >
        {!chatName ? <UnselectedChat /> : <Chat chatName={chatName} />}
      </Box>
    </Box>
  )
}

IndexPage.getInitialProps = async ctx => {
  const response = await ctx.apolloClient.query({
    query: whoamiQuery,
    variables: { userId: ctx.query.userId }
  })

  return {
    chatName: ctx.query.chatName,
    me: response.data.whoami
  }
}

export default withApollo(IndexPage)
