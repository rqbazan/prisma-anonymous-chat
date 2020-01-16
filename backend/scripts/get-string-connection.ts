export default function getStringConnection() {
  if (!process.env.NODE_ENV) {
    return 'postgresql://prisma:prisma@localhost:5432/prisma'
  }

  if (process.env.NODE_ENV === 'production') {
    return process.env.DATABASE_URL
  }

  throw Error('The string connection cannot be resolved')
}
