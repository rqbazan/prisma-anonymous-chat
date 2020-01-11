function updateNickname(_, { nickname }, { userId, prisma }) {
  return prisma.updateUser({
    data: { nickname },
    where: { id: userId }
  })
}

export default {
  updateNickname
}
