import gql from 'graphql-tag'

export default gql`
  mutation sendMessage(
    $content: String!
    $channelName: String!
    $channelType: ChannelType!
  ) {
    sendMessage(
      content: $content
      channelName: $channelName
      channelType: $channelType
    ) {
      id
      content
      author {
        id
        nickname
      }
    }
  }
`
