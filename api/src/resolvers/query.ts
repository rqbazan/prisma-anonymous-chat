import { UserNullablePromise } from '@prisma'
import { Resolver } from '~/types'

const whoami: Resolver<UserNullablePromise> = (_, { userId }, { prisma }) => {
  return prisma.user({ id: userId })
}

export default {
  whoami
}
