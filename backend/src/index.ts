import createNextServer from 'next'
import { prisma } from '@prisma'
import { GraphQLServer, Options as YogaOptions } from 'graphql-yoga'
import createAppRouter from './router'
import resolvers from './resolvers'

const yogaOptions: YogaOptions = {
  port: process.env.PORT || '4000',
  endpoint: '/api/graphql',
  subscriptions: '/api/subscriptions',
  playground: '/api/playground'
}

const nextOptions = {
  dev: process.env.NODE_ENV !== 'production',
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

  graphQLServer.express.use(createAppRouter(nextServer))

  graphQLServer.start(yogaOptions, ({ port }) => {
    console.log(`Server is running on http://localhost:${port} 🎉`)
  })
})
