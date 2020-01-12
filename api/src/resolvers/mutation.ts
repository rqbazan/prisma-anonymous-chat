import { UserNullablePromise } from '@prisma'
import { Resolver } from '~/types'

const updateNickname: Resolver<UserNullablePromise> = (
  _,
  { nickname },
  { userId, prisma }
) => {
  return prisma.updateUser({
    data: { nickname },
    where: { id: userId }
  })
}

export default {
  updateNickname
}
