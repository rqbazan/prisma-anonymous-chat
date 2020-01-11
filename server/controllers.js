import { prisma } from '../generated/prisma-client'
import getUser, { createUser } from './utils/get-user'

export default app => {
  const webHandler = app.getRequestHandler()

  async function root(req, res, forward) {
    if (req.url.startsWith('/_next')) {
      return forward()
    }

    const { userId } = req.params

    if (!userId) {
      const newUser = await createUser(prisma)
      return res.redirect(`/${newUser.id}`)
    }

    const user = await getUser(prisma, userId)

    return app.render(req, res, '/', {
      userId: user.id,
      chatName: req.params.chatName
    })
  }

  function all(req, res, forward) {
    if (req.url.startsWith('/api')) {
      forward()
    } else {
      webHandler(req, res)
    }
  }

  return {
    root,
    all
  }
}
