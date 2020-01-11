function updateNickname(_, { nickname }, { req, prisma }) {
  return prisma.updateUser({
    data: { nickname },
    where: { id: req.headers['non-secret-user-id'] }
  })
}

export default {
  updateNickname
}
