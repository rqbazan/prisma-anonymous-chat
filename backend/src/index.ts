import createNextServer from 'next'
import { prisma } from '@prisma'
import { GraphQLServer, Options as YogaOptions } from 'graphql-yoga'
import sslRedirect from 'heroku-ssl-redirect'
import createAppRouter from './router'
import resolvers from './resolvers'

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || '4000'

const yogaOptions: YogaOptions = {
  port,
  endpoint: '/api/graphql',
  subscriptions: '/api/subscriptions',
  playground: '/api/playground',
  cors: {
    credentials: true,
    origin: dev
      ? [process.env.SERVER_URL!, `http://192.168.1.132:${port}`]
      : process.env.SERVER_URL
  }
}

const nextOptions = {
  dev,
  dir: 'frontend'
}

const nextServer = createNextServer(nextOptions)

nextServer.prepare().then(() => {
  const graphQLServer = new GraphQLServer({
    resolvers,
    typeDefs: './backend/src/resolvers/schema.graphql',
    context: ({ request }) => ({
      prisma,
      req: request,
      userId: request.headers['non-secret-user-id']
    })
  })

  graphQLServer.express.use(sslRedirect(['production']))
  graphQLServer.express.use(createAppRouter(nextServer))

  graphQLServer.start(yogaOptions, () => {
    console.log(`Server is running on http://localhost:${port} 🎉`)
  })
})
