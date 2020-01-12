import createNextServer from 'next'
import express from 'express'
import { prisma } from '@prisma'
import getUser, { createUser } from '~/common/get-user'

export default (nextServer: ReturnType<typeof createNextServer>) => {
  const webHandler = nextServer.getRequestHandler()
  const appRouter = express.Router()

  appRouter.get('/', async (_, res) => {
    const newUser = await createUser(prisma)
    res.redirect(`/${newUser.id}`)
  })

  appRouter.get('/:userId/:chatName?', async (req, res, forward) => {
    if (req.url.startsWith('/_next') || req.url.startsWith('/api')) {
      return forward()
    }

    const { userId } = req.params
    const user = await getUser(prisma, userId)

    return nextServer.render(req, res, '/', {
      userId: user.id,
      chatName: req.params.chatName
    })
  })

  appRouter.use((req, res, forward) => {
    if (req.url.startsWith('/api')) {
      forward()
    } else {
      webHandler(req, res)
    }
  })

  return appRouter
}
