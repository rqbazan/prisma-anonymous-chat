import gql from 'graphql-tag'

export default gql`
  query chats {
    chats {
      id
      channelType
      lastMessage {
        id
        content
      }
      displayName @client
      channelName @client
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
    }
  }
`
