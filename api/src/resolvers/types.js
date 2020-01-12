export default {
  User: {
    displayName: user => user.nickname,
    type: () => 'USER'
  },
  Category: {
    displayName: category => `#${category.name}`,
    type: () => 'CATEGORY'
  }
}
