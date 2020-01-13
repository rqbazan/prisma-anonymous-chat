import createNextServer from 'next'
import express from 'express'
import { prisma } from '@prisma'
import getUser, { createUser } from '~/common/get-user'

export default (nextServer: ReturnType<typeof createNextServer>) => {
  const webHandler = nextServer.getRequestHandler()
  const appRouter = express.Router()

  if (process.env.NODE_ENV !== 'production') {
    appRouter.get('/test', async (req, res) => {
      nextServer.render(req, res, '/test')
    })
  }

  appRouter.get('/', async (_, res) => {
    const newUser = await createUser(prisma)
    res.redirect(`/${newUser.id}`)
  })

  appRouter.get(
    '/:userId/:channelType?/:channelName?',
    async (req, res, forward) => {
      if (req.url.startsWith('/_next') || req.url.startsWith('/api')) {
        return forward()
      }

      const { userId } = req.params

      if (req.params.channelType && !req.params.channelName) {
        return res.redirect(`/${userId}`)
      }

      const user = await getUser(prisma, userId)

      return nextServer.render(req, res, '/', {
        userId: user.id,
        channelType: req.params.channelType,
        channelName: req.params.channelName
      })
    }
  )

  appRouter.use((req, res, forward) => {
    if (req.url.startsWith('/api')) {
      forward()
    } else {
      webHandler(req, res)
    }
  })

  return appRouter
}
