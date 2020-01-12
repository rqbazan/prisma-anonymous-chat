import gql from 'graphql-tag'

export default gql`
  query whoami($userId: ID!) {
    whoami(userId: $userId) {
      id
      nickname
    }
  }
`
