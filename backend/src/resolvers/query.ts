import { UserNullablePromise, Category, User } from '@prisma'
import { Resolver } from '~/types'

const whoami: Resolver<UserNullablePromise> = (_, { userId }, { prisma }) => {
  return prisma.user({ id: userId })
}

const search: Resolver<any[]> = async (_, { displayNameLike }, { prisma }) => {
  function normalize(type: 'p' | 'c') {
    return (obj: Category | User) => ({ ...obj, type })
  }

  if (displayNameLike.startsWith('#')) {
    const categories = await prisma.categories({
      where: { name_contains: displayNameLike.slice(1) },
      orderBy: 'name_ASC',
      first: 10
    })

    return categories.map(normalize('c'))
  }

  const [users, categories] = await Promise.all([
    prisma.users({
      where: { nickname_contains: displayNameLike },
      orderBy: 'nickname_ASC',
      first: 10
    }),
    prisma.categories({
      where: { name_contains: displayNameLike },
      orderBy: 'name_ASC',
      first: 10
    })
  ])

  return [...users.map(normalize('p')), ...categories.map(normalize('c'))]
}

export default {
  whoami,
  search
}
