function whoami(_, { userId }, { prisma }) {
  return prisma.user({ id: userId })
}

export default {
  whoami
}
