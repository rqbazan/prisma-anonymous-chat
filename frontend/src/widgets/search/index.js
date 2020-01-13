import React from 'react'
import Router from 'next/router'
import { Box } from '@xstyled/styled-components'
import { useApolloClient } from '@apollo/react-hooks'
import SearchBar from '~/components/search-bar'
import ChannelPreview from '~/components/channel-preview'
import Loader from '~/components/loader'
import searchQuery from '~/graphql/search'
import MockList from './mock-list'

function SearchLoader() {
  return (
    <Box p="3" display="flex" alignItems="center">
      <Loader dark size={24} />
      <div style={{ marginLeft: 8 }}>Searching...</div>
    </Box>
  )
}

const initialState = {
  searching: false,
  viewSearching: false,
  channels: [],
  term: ''
}

export default function Search({ user }) {
  const apolloClient = useApolloClient()

  const [state, setState] = React.useReducer(
    (p, n) => ({ ...p, ...n }),
    initialState
  )

  const onSearch = React.useCallback(async text => {
    try {
      const response = await apolloClient.query({
        query: searchQuery,
        variables: { displayNameLike: text }
      })
      setState({ channels: response.data.search })
    } catch (error) {
      console.error(error)
    } finally {
      setState({ searching: false })
    }
  }, [])

  function renderContent() {
    if (!state.viewSearching) {
      return <MockList />
    }

    if (state.searching) {
      return <SearchLoader />
    }

    if (!state.channels.length) {
      return (
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
    }

    return state.channels.map(channel => {
      const goToChannel = () => {
        Router.push(
          {
            pathname: '/',
            query: {
              channelType: channel.type,
              channelName: channel.name,
              userId: user.id
            }
          },
          `/${user.id}/${channel.type}/${channel.name}`
        )
        setState(initialState)
      }

      return (
        <ChannelPreview
          data-is-channel-preview
          tabIndex="0"
          channel={channel}
          onClick={goToChannel}
          onKeyPress={goToChannel}
        />
      )
    })
  }

  return (
    <Box display="flex" flexDirection="column" flex="1" minHeight="0px">
      <Box p="3" pt="1">
        <SearchBar
          value={state.term}
          onChange={e => setState({ term: e.target.value })}
          onSearch={onSearch}
          onSearching={searching => setState({ searching })}
          placeholder="Search any user or a #group"
          onFocus={() => setState({ viewSearching: true })}
          onBlur={e => {
            if (!e.relatedTarget?.dataset?.isChannelPreview) {
              setState(initialState)
            }
          }}
        />
      </Box>
      <Box flex="1" overflow="auto" minHeight="0px">
        {renderContent()}
      </Box>
    </Box>
  )
}
