import sessionIdQuery from '~/graphql/queries/session-id'

export default function(apolloCache) {
  return apolloCache.readQuery({ query: sessionIdQuery }).sessionId
}
