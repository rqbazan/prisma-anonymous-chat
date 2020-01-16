import gql from 'graphql-tag'

export default gql`
  query getChat($channelName: String!, $channelType: ChannelType!) {
    chat: getChat(channelName: $channelName, channelType: $channelType) {
      id
      displayName @client
      ... on PrivateChat {
        participateA {
          id
          nickname
        }
        participateB {
          id
          nickname
        }
      }
      ... on GroupChat {
        category {
          id
          name
        }
      }
      messages {
        id
        isOneOfMine @client
        content
        author {
          id
          nickname
        }
      }
    }
  }
`
