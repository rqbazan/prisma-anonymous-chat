let cachedUserId = null

export default function getNonSecretId(ctx) {
  if (typeof window === 'undefined') {
    return ctx.req.sessionId
  }

  if (cachedUserId) {
    return cachedUserId
  }

  if (typeof window !== 'undefined') {
    ;[cachedUserId] = new URL(window.location.href).pathname
      .split('/')
      .filter(Boolean)
  }

  return cachedUserId
}
