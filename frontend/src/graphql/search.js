import gql from 'graphql-tag'

export default gql`
  query search($displayNameLike: String!) {
    search(displayNameLike: $displayNameLike) {
      id
      displayName
      name
      type
    }
  }
`
