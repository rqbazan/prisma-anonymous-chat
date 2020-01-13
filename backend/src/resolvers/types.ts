export default {
  Node: {
    __resolveType: obj => (obj.nickname ? 'User' : 'Category')
  },
  Channel: {
    name: obj => (obj.type === 'p' ? obj.nickname : obj.name),
    displayName: obj => (obj.type === 'p' ? obj.nickname : `#${obj.name}`)
  }
}
