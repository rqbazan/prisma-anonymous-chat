import { User, Category } from '@prisma'

export default {
  User: {
    displayName: (user: User) => user.nickname,
    type: () => 'USER'
  },
  Category: {
    displayName: (category: Category) => `#${category.name}`,
    type: () => 'CATEGORY'
  },
  Searchable: {
    __resolveType: obj => (obj.nickname ? 'User' : 'Category')
  }
}
