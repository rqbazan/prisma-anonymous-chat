import React from 'react'
import { Box } from '@xstyled/styled-components'
import { useQuery } from '@apollo/react-hooks'
import withApollo from '~/hocs/with-apollo'
import withModal from '~/hocs/with-modal'
import UnselectedChat from '~/components/unselected-chat'
import UserSection from '~/widgets/user-section'
import Chat from '~/widgets/chat'
import Search from '~/widgets/search'
import whoamiQuery from '~/graphql/queries/whoami'

function IndexPage({ channelName, userId }) {
  const { data, loading } = useQuery(whoamiQuery, { variables: { userId } })

  if (loading) {
    return null
  }

  const user = data.whoami

  return (
    <Box display="flex" height="100vh">
      <Box
        display={{ xs: channelName ? 'none' : 'flex', md: 'flex' }}
        flexDirection="column"
        borderRight="1px solid"
        borderColor="gray.3"
        width={{ xs: '100%', md: '40%', lg: '30%', xl: '20%' }}
        backgroundColor="gray.1"
        zIndex="1"
      >
        <UserSection user={user} />
        <Search user={user} />
      </Box>
      <Box
        display={{
          xs: channelName ? 'flex' : 'none',
          md: 'flex'
        }}
        flexDirection="column"
        width={{ xs: '100%', md: '60%', lg: '70%', xl: '80%' }}
      >
        {!channelName ? <UnselectedChat /> : <Chat />}
      </Box>
    </Box>
  )
}

IndexPage.getInitialProps = async ctx => {
  return {
    channelName: ctx.query.channelName,
    userId: ctx.query.userId
  }
}

export default withApollo(withModal(IndexPage))
