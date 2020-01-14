import gql from 'graphql-tag'

export default gql`
  mutation updateUser($nickname: String!) {
    updateUser(nickname: $nickname) {
      id
      nickname
    }
  }
`
