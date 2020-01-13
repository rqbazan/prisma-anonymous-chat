import { UserNullablePromise, User, Category } from '@prisma'
import { Resolver } from '~/types'

const whoami: Resolver<UserNullablePromise> = (_, { userId }, { prisma }) => {
  return prisma.user({ id: userId })
}

const search: Resolver<User[] | Category[]> = async (
  _,
  { displayNameLike },
  { prisma }
) => {
  if (displayNameLike.startsWith('#')) {
    return prisma.categories({
      where: { name_contains: displayNameLike.slice(1) }
    })
  }

  return prisma.users({
    where: { nickname_contains: displayNameLike }
  })
}

export default {
  whoami,
  search
}
