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

  appRouter.get('/api/prisma', async (_, res) => {
    res.redirect(process.env.PRISMA_URL!)
  })

  appRouter.get('/', async (_, res) => {
    const newUser = await createUser(prisma)
    res.redirect(`/u/${newUser.id}`)
  })

  appRouter.get('/u/:id/:type?/:name?', async (req, res) => {
    const {
      params: { id: userId, type: channelType, name: channelName }
    } = req

    if (channelType && !channelName) {
      return res.redirect(`/u/${userId}`)
    }

    const user = await getUser(prisma, userId)

    // @ts-ignore
    req.sessionId = user.id

    return nextServer.render(req, res, '/', {
      channelType,
      channelName,
      userId: user.id
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
