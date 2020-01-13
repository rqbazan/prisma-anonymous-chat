import React from 'react'
import Link from 'next/link'
import { Box } from '@xstyled/styled-components'
import SearchBar from '~/components/search-bar'
import ChatPreview from '~/components/chat-preview'
import Loader from '~/components/loader'

function MockList({ user, chatName }) {
  return (
    <>
      {Array.from({ length: 50 }).map((v, index) => (
        <Link
          scroll={false}
          href={{
            pathname: '/',
            query: {
              chatName: index % 2 ? 'ricardo' : 'reactjs',
              userId: user.id
            }
          }}
          as={index % 2 ? `/${user.id}/ricardo` : `/${user.id}/reactjs`}
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
    </>
  )
}

function SearchLoading() {
  return (
    <Box p="3" display="flex" alignItems="center">
      <Loader dark size={24} />
      <div style={{ marginLeft: 8 }}>Searching...</div>
    </Box>
  )
}

export default function Search({ user, chatName }) {
  const [searching, setSearching] = React.useState(false)
  const [viewSearching, setViewSearching] = React.useState(false)

  const onSearch = React.useCallback(text => {
    try {
      console.log(text)
    } catch (error) {
      console.error(error)
    } finally {
      setSearching(false)
    }
  }, [])

  return (
    <Box display="flex" flexDirection="column" flex="1" minHeight="0px">
      <Box p="3" pt="1">
        <SearchBar
          onChange={onSearch}
          onLoading={setSearching}
          placeholder="Search any user or a #group"
          onFocus={() => setViewSearching(true)}
          onBlur={() => setViewSearching(false)}
        />
      </Box>
      <Box flex="1" overflow="auto" minHeight="0px">
        {/* eslint-disable-next-line */}
        {viewSearching ? (
          searching ? (
            <SearchLoading />
          ) : (
            <Box p="5" height="full">
              <img
                src="https://res.cloudinary.com/dpwoyjb1f/image/upload/v1578875002/id-challenge/undraw_searching_p5ux_nw4hde.svg"
                alt="empty search"
                css={`
                  height: 100%;
                  max-width: 100%;
                `}
              />
            </Box>
          )
        ) : (
          <MockList user={user} chatName={chatName} />
        )}
      </Box>
    </Box>
  )
}
