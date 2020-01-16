import sessionIdQuery from '~/graphql/queries/session-id'
import getNonSecretId from './get-non-secret-id'

export default function getSessionId(apolloCache) {
  if (typeof window !== 'undefined') {
    return getNonSecretId()
  }

  return apolloCache.readQuery({ query: sessionIdQuery }).sessionId
}
