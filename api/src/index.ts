import { prisma } from '@prisma'
import { GraphQLServer, Options as YogaOptions } from 'graphql-yoga'
import resolvers from './resolvers'

const server = new GraphQLServer({
  resolvers,
  typeDefs: './src/resolvers/schema.graphql',
  context: ({ request }) => ({
    prisma,
    req: request,
    userId: request.headers['non-secret-user-id']
  })
})

const options: YogaOptions = {
  port: process.env.PORT || '4000',
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground'
}

server.start(options, () => {
  console.log(`Server is running on http://localhost:${options.port} 🎉`)
})
