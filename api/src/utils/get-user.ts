import nanoid from 'nanoid'
import { Prisma } from '@prisma'

export function createUser(prisma: Prisma) {
  return prisma.createUser({ nickname: nanoid() })
}

export default async function getUser(prisma: Prisma, userId: string) {
  if (!userId) {
    return createUser(prisma)
  }

  const isInDB = await prisma.$exists.user({ id: userId })

  if (!isInDB) {
    return createUser(prisma)
  }

  return prisma.user({ id: userId })
}
