import next from 'next'
import { GraphQLServer, MockList } from 'graphql-yoga'

const typeDefs = `
  type Query {
    hello(name: String): String!
    listOfStrings: [String]
  }
`

const mocks = {
  Query: () => ({
    hello: () => 'Hello World',
    listOfStrings: () => new MockList([2, 6])
  })
}

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev, dir: 'web' })
const webHandler = app.getRequestHandler()

app.prepare().then(() => {
  const server = new GraphQLServer({ typeDefs, mocks, resolvers: () => true })

  server.express.get('/:chatName', (req, res) => {
    app.render(req, res, '/', { chatName: req.params.chatName })
  })

  server.express.get('*', (req, res, forward) => {
    if (req.url.startsWith('/api')) {
      forward()
    } else {
      webHandler(req, res)
    }
  })

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
