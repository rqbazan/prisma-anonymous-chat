import nanoid from 'nanoid'

export function createUser(prisma) {
  return prisma.createUser({ nickname: nanoid() })
}

export default async function getUser(prisma, userId) {
  if (!userId) {
    return createUser(prisma)
  }

  const isInDB = await prisma.$exists.user({ id: userId })

  if (!isInDB) {
    return createUser(prisma)
  }

  return prisma.user({ id: userId })
}
