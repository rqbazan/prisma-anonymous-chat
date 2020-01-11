import next from 'next'
import { GraphQLServer } from 'graphql-yoga'
import resolvers from './resolvers'
import routes from './routes'
import { prisma } from '../generated/prisma-client'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: 'web' })

app.prepare().then(() => {
  const server = new GraphQLServer({
    resolvers,
    typeDefs: './server/graphql/schema.gql',
    context: ({ request }) => ({ req: request, prisma })
  })

  server.express.use(routes(app))

  const options = {
    port: parseInt(process.env.PORT, 10) || 3000,
    endpoint: '/api/graphql',
    subscriptions: '/api/subscriptions',
    playground: '/api/playground'
  }

  server.start(options, () => {
    console.log(`Server is running on http://localhost:${options.port} 🎉`)
  })
})
