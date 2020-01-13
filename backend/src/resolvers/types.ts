export default {
  Node: {
    __resolveType: obj => (obj.nickname ? 'User' : 'Category')
  },
  Channel: {
    name: obj => (obj.type === 'USER' ? obj.nickname : obj.name),
    displayName: obj => (obj.type === 'USER' ? obj.nickname : `#${obj.name}`)
  }
}
