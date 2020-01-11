export default async (_, { userId }, { prisma }) => {
  const user = await prisma.user({ id: userId })

  return {
    ...user,
    displayName: user.nickname,
    type: 'USER'
  }
}
