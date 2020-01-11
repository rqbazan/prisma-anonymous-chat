import getUser from '../helpers/get-user'

export default async (_, __, { req, prisma }) => {
  const userId = req.headers['non-secret-id']
  const user = await getUser(prisma, userId)

  return {
    ...user,
    displayName: user.nickname,
    type: 'USER'
  }
}
