// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `
  type AggregateCategory {
    count: Int!
  }

  type AggregateChat {
    count: Int!
  }

  type AggregateGroupChat {
    count: Int!
  }

  type AggregateMessage {
    count: Int!
  }

  type AggregatePrivateChat {
    count: Int!
  }

  type AggregateUser {
    count: Int!
  }

  type BatchPayload {
    count: Long!
  }

  type Category {
    id: ID!
    name: String!
  }

  type CategoryConnection {
    pageInfo: PageInfo!
    edges: [CategoryEdge]!
    aggregate: AggregateCategory!
  }

  input CategoryCreateInput {
    id: ID
    name: String!
  }

  input CategoryCreateOneInput {
    create: CategoryCreateInput
    connect: CategoryWhereUniqueInput
  }

  type CategoryEdge {
    node: Category!
    cursor: String!
  }

  enum CategoryOrderByInput {
    id_ASC
    id_DESC
    name_ASC
    name_DESC
  }

  type CategoryPreviousValues {
    id: ID!
    name: String!
  }

  type CategorySubscriptionPayload {
    mutation: MutationType!
    node: Category
    updatedFields: [String!]
    previousValues: CategoryPreviousValues
  }

  input CategorySubscriptionWhereInput {
    mutation_in: [MutationType!]
    updatedFields_contains: String
    updatedFields_contains_every: [String!]
    updatedFields_contains_some: [String!]
    node: CategoryWhereInput
    AND: [CategorySubscriptionWhereInput!]
    OR: [CategorySubscriptionWhereInput!]
    NOT: [CategorySubscriptionWhereInput!]
  }

  input CategoryUpdateDataInput {
    name: String
  }

  input CategoryUpdateInput {
    name: String
  }

  input CategoryUpdateManyMutationInput {
    name: String
  }

  input CategoryUpdateOneRequiredInput {
    create: CategoryCreateInput
    update: CategoryUpdateDataInput
    upsert: CategoryUpsertNestedInput
    connect: CategoryWhereUniqueInput
  }

  input CategoryUpsertNestedInput {
    update: CategoryUpdateDataInput!
    create: CategoryCreateInput!
  }

  input CategoryWhereInput {
    id: ID
    id_not: ID
    id_in: [ID!]
    id_not_in: [ID!]
    id_lt: ID
    id_lte: ID
    id_gt: ID
    id_gte: ID
    id_contains: ID
    id_not_contains: ID
    id_starts_with: ID
    id_not_starts_with: ID
    id_ends_with: ID
    id_not_ends_with: ID
    name: String
    name_not: String
    name_in: [String!]
    name_not_in: [String!]
    name_lt: String
    name_lte: String
    name_gt: String
    name_gte: String
    name_contains: String
    name_not_contains: String
    name_starts_with: String
    name_not_starts_with: String
    name_ends_with: String
    name_not_ends_with: String
    AND: [CategoryWhereInput!]
    OR: [CategoryWhereInput!]
    NOT: [CategoryWhereInput!]
  }

  input CategoryWhereUniqueInput {
    id: ID
    name: String
  }

  type Chat {
    id: ID!
    type: ChatType
  }

  type ChatConnection {
    pageInfo: PageInfo!
    edges: [ChatEdge]!
    aggregate: AggregateChat!
  }

  input ChatCreateInput {
    id: ID
    type: ChatType
  }

  input ChatCreateOneInput {
    create: ChatCreateInput
    connect: ChatWhereUniqueInput
  }

  type ChatEdge {
    node: Chat!
    cursor: String!
  }

  enum ChatOrderByInput {
    id_ASC
    id_DESC
    type_ASC
    type_DESC
  }

  type ChatPreviousValues {
    id: ID!
    type: ChatType
  }

  type ChatSubscriptionPayload {
    mutation: MutationType!
    node: Chat
    updatedFields: [String!]
    previousValues: ChatPreviousValues
  }

  input ChatSubscriptionWhereInput {
    mutation_in: [MutationType!]
    updatedFields_contains: String
    updatedFields_contains_every: [String!]
    updatedFields_contains_some: [String!]
    node: ChatWhereInput
    AND: [ChatSubscriptionWhereInput!]
    OR: [ChatSubscriptionWhereInput!]
    NOT: [ChatSubscriptionWhereInput!]
  }

  enum ChatType {
    PRIVATE
    GROUP
  }

  input ChatUpdateDataInput {
    type: ChatType
  }

  input ChatUpdateInput {
    type: ChatType
  }

  input ChatUpdateManyMutationInput {
    type: ChatType
  }

  input ChatUpdateOneRequiredInput {
    create: ChatCreateInput
    update: ChatUpdateDataInput
    upsert: ChatUpsertNestedInput
    connect: ChatWhereUniqueInput
  }

  input ChatUpsertNestedInput {
    update: ChatUpdateDataInput!
    create: ChatCreateInput!
  }

  input ChatWhereInput {
    id: ID
    id_not: ID
    id_in: [ID!]
    id_not_in: [ID!]
    id_lt: ID
    id_lte: ID
    id_gt: ID
    id_gte: ID
    id_contains: ID
    id_not_contains: ID
    id_starts_with: ID
    id_not_starts_with: ID
    id_ends_with: ID
    id_not_ends_with: ID
    type: ChatType
    type_not: ChatType
    type_in: [ChatType!]
    type_not_in: [ChatType!]
    AND: [ChatWhereInput!]
    OR: [ChatWhereInput!]
    NOT: [ChatWhereInput!]
  }

  input ChatWhereUniqueInput {
    id: ID
  }

  scalar DateTime

  type GroupChat {
    id: ID!
    category: Category!
    participates(
      where: UserWhereInput
      orderBy: UserOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [User!]
    messages(
      where: MessageWhereInput
      orderBy: MessageOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [Message!]
    createdAt: DateTime!
    lastSentMessageAt: DateTime!
  }

  type GroupChatConnection {
    pageInfo: PageInfo!
    edges: [GroupChatEdge]!
    aggregate: AggregateGroupChat!
  }

  input GroupChatCreateInput {
    id: ID
    category: CategoryCreateOneInput!
    participates: UserCreateManyInput
    messages: MessageCreateManyInput
    lastSentMessageAt: DateTime!
  }

  type GroupChatEdge {
    node: GroupChat!
    cursor: String!
  }

  enum GroupChatOrderByInput {
    id_ASC
    id_DESC
    createdAt_ASC
    createdAt_DESC
    lastSentMessageAt_ASC
    lastSentMessageAt_DESC
  }

  type GroupChatPreviousValues {
    id: ID!
    createdAt: DateTime!
    lastSentMessageAt: DateTime!
  }

  type GroupChatSubscriptionPayload {
    mutation: MutationType!
    node: GroupChat
    updatedFields: [String!]
    previousValues: GroupChatPreviousValues
  }

  input GroupChatSubscriptionWhereInput {
    mutation_in: [MutationType!]
    updatedFields_contains: String
    updatedFields_contains_every: [String!]
    updatedFields_contains_some: [String!]
    node: GroupChatWhereInput
    AND: [GroupChatSubscriptionWhereInput!]
    OR: [GroupChatSubscriptionWhereInput!]
    NOT: [GroupChatSubscriptionWhereInput!]
  }

  input GroupChatUpdateInput {
    category: CategoryUpdateOneRequiredInput
    participates: UserUpdateManyInput
    messages: MessageUpdateManyInput
    lastSentMessageAt: DateTime
  }

  input GroupChatUpdateManyMutationInput {
    lastSentMessageAt: DateTime
  }

  input GroupChatWhereInput {
    id: ID
    id_not: ID
    id_in: [ID!]
    id_not_in: [ID!]
    id_lt: ID
    id_lte: ID
    id_gt: ID
    id_gte: ID
    id_contains: ID
    id_not_contains: ID
    id_starts_with: ID
    id_not_starts_with: ID
    id_ends_with: ID
    id_not_ends_with: ID
    category: CategoryWhereInput
    participates_every: UserWhereInput
    participates_some: UserWhereInput
    participates_none: UserWhereInput
    messages_every: MessageWhereInput
    messages_some: MessageWhereInput
    messages_none: MessageWhereInput
    createdAt: DateTime
    createdAt_not: DateTime
    createdAt_in: [DateTime!]
    createdAt_not_in: [DateTime!]
    createdAt_lt: DateTime
    createdAt_lte: DateTime
    createdAt_gt: DateTime
    createdAt_gte: DateTime
    lastSentMessageAt: DateTime
    lastSentMessageAt_not: DateTime
    lastSentMessageAt_in: [DateTime!]
    lastSentMessageAt_not_in: [DateTime!]
    lastSentMessageAt_lt: DateTime
    lastSentMessageAt_lte: DateTime
    lastSentMessageAt_gt: DateTime
    lastSentMessageAt_gte: DateTime
    AND: [GroupChatWhereInput!]
    OR: [GroupChatWhereInput!]
    NOT: [GroupChatWhereInput!]
  }

  input GroupChatWhereUniqueInput {
    id: ID
  }

  scalar Long

  type Message {
    id: ID!
    content: String!
    createdAt: DateTime!
    author: User!
    chat: Chat!
  }

  type MessageConnection {
    pageInfo: PageInfo!
    edges: [MessageEdge]!
    aggregate: AggregateMessage!
  }

  input MessageCreateInput {
    id: ID
    content: String!
    author: UserCreateOneInput!
    chat: ChatCreateOneInput!
  }

  input MessageCreateManyInput {
    create: [MessageCreateInput!]
    connect: [MessageWhereUniqueInput!]
  }

  type MessageEdge {
    node: Message!
    cursor: String!
  }

  enum MessageOrderByInput {
    id_ASC
    id_DESC
    content_ASC
    content_DESC
    createdAt_ASC
    createdAt_DESC
  }

  type MessagePreviousValues {
    id: ID!
    content: String!
    createdAt: DateTime!
  }

  input MessageScalarWhereInput {
    id: ID
    id_not: ID
    id_in: [ID!]
    id_not_in: [ID!]
    id_lt: ID
    id_lte: ID
    id_gt: ID
    id_gte: ID
    id_contains: ID
    id_not_contains: ID
    id_starts_with: ID
    id_not_starts_with: ID
    id_ends_with: ID
    id_not_ends_with: ID
    content: String
    content_not: String
    content_in: [String!]
    content_not_in: [String!]
    content_lt: String
    content_lte: String
    content_gt: String
    content_gte: String
    content_contains: String
    content_not_contains: String
    content_starts_with: String
    content_not_starts_with: String
    content_ends_with: String
    content_not_ends_with: String
    createdAt: DateTime
    createdAt_not: DateTime
    createdAt_in: [DateTime!]
    createdAt_not_in: [DateTime!]
    createdAt_lt: DateTime
    createdAt_lte: DateTime
    createdAt_gt: DateTime
    createdAt_gte: DateTime
    AND: [MessageScalarWhereInput!]
    OR: [MessageScalarWhereInput!]
    NOT: [MessageScalarWhereInput!]
  }

  type MessageSubscriptionPayload {
    mutation: MutationType!
    node: Message
    updatedFields: [String!]
    previousValues: MessagePreviousValues
  }

  input MessageSubscriptionWhereInput {
    mutation_in: [MutationType!]
    updatedFields_contains: String
    updatedFields_contains_every: [String!]
    updatedFields_contains_some: [String!]
    node: MessageWhereInput
    AND: [MessageSubscriptionWhereInput!]
    OR: [MessageSubscriptionWhereInput!]
    NOT: [MessageSubscriptionWhereInput!]
  }

  input MessageUpdateDataInput {
    content: String
    author: UserUpdateOneRequiredInput
    chat: ChatUpdateOneRequiredInput
  }

  input MessageUpdateInput {
    content: String
    author: UserUpdateOneRequiredInput
    chat: ChatUpdateOneRequiredInput
  }

  input MessageUpdateManyDataInput {
    content: String
  }

  input MessageUpdateManyInput {
    create: [MessageCreateInput!]
    update: [MessageUpdateWithWhereUniqueNestedInput!]
    upsert: [MessageUpsertWithWhereUniqueNestedInput!]
    delete: [MessageWhereUniqueInput!]
    connect: [MessageWhereUniqueInput!]
    set: [MessageWhereUniqueInput!]
    disconnect: [MessageWhereUniqueInput!]
    deleteMany: [MessageScalarWhereInput!]
    updateMany: [MessageUpdateManyWithWhereNestedInput!]
  }

  input MessageUpdateManyMutationInput {
    content: String
  }

  input MessageUpdateManyWithWhereNestedInput {
    where: MessageScalarWhereInput!
    data: MessageUpdateManyDataInput!
  }

  input MessageUpdateWithWhereUniqueNestedInput {
    where: MessageWhereUniqueInput!
    data: MessageUpdateDataInput!
  }

  input MessageUpsertWithWhereUniqueNestedInput {
    where: MessageWhereUniqueInput!
    update: MessageUpdateDataInput!
    create: MessageCreateInput!
  }

  input MessageWhereInput {
    id: ID
    id_not: ID
    id_in: [ID!]
    id_not_in: [ID!]
    id_lt: ID
    id_lte: ID
    id_gt: ID
    id_gte: ID
    id_contains: ID
    id_not_contains: ID
    id_starts_with: ID
    id_not_starts_with: ID
    id_ends_with: ID
    id_not_ends_with: ID
    content: String
    content_not: String
    content_in: [String!]
    content_not_in: [String!]
    content_lt: String
    content_lte: String
    content_gt: String
    content_gte: String
    content_contains: String
    content_not_contains: String
    content_starts_with: String
    content_not_starts_with: String
    content_ends_with: String
    content_not_ends_with: String
    createdAt: DateTime
    createdAt_not: DateTime
    createdAt_in: [DateTime!]
    createdAt_not_in: [DateTime!]
    createdAt_lt: DateTime
    createdAt_lte: DateTime
    createdAt_gt: DateTime
    createdAt_gte: DateTime
    author: UserWhereInput
    chat: ChatWhereInput
    AND: [MessageWhereInput!]
    OR: [MessageWhereInput!]
    NOT: [MessageWhereInput!]
  }

  input MessageWhereUniqueInput {
    id: ID
  }

  type Mutation {
    createCategory(data: CategoryCreateInput!): Category!
    updateCategory(
      data: CategoryUpdateInput!
      where: CategoryWhereUniqueInput!
    ): Category
    updateManyCategories(
      data: CategoryUpdateManyMutationInput!
      where: CategoryWhereInput
    ): BatchPayload!
    upsertCategory(
      where: CategoryWhereUniqueInput!
      create: CategoryCreateInput!
      update: CategoryUpdateInput!
    ): Category!
    deleteCategory(where: CategoryWhereUniqueInput!): Category
    deleteManyCategories(where: CategoryWhereInput): BatchPayload!
    createChat(data: ChatCreateInput!): Chat!
    updateChat(data: ChatUpdateInput!, where: ChatWhereUniqueInput!): Chat
    updateManyChats(
      data: ChatUpdateManyMutationInput!
      where: ChatWhereInput
    ): BatchPayload!
    upsertChat(
      where: ChatWhereUniqueInput!
      create: ChatCreateInput!
      update: ChatUpdateInput!
    ): Chat!
    deleteChat(where: ChatWhereUniqueInput!): Chat
    deleteManyChats(where: ChatWhereInput): BatchPayload!
    createGroupChat(data: GroupChatCreateInput!): GroupChat!
    updateGroupChat(
      data: GroupChatUpdateInput!
      where: GroupChatWhereUniqueInput!
    ): GroupChat
    updateManyGroupChats(
      data: GroupChatUpdateManyMutationInput!
      where: GroupChatWhereInput
    ): BatchPayload!
    upsertGroupChat(
      where: GroupChatWhereUniqueInput!
      create: GroupChatCreateInput!
      update: GroupChatUpdateInput!
    ): GroupChat!
    deleteGroupChat(where: GroupChatWhereUniqueInput!): GroupChat
    deleteManyGroupChats(where: GroupChatWhereInput): BatchPayload!
    createMessage(data: MessageCreateInput!): Message!
    updateMessage(
      data: MessageUpdateInput!
      where: MessageWhereUniqueInput!
    ): Message
    updateManyMessages(
      data: MessageUpdateManyMutationInput!
      where: MessageWhereInput
    ): BatchPayload!
    upsertMessage(
      where: MessageWhereUniqueInput!
      create: MessageCreateInput!
      update: MessageUpdateInput!
    ): Message!
    deleteMessage(where: MessageWhereUniqueInput!): Message
    deleteManyMessages(where: MessageWhereInput): BatchPayload!
    createPrivateChat(data: PrivateChatCreateInput!): PrivateChat!
    updatePrivateChat(
      data: PrivateChatUpdateInput!
      where: PrivateChatWhereUniqueInput!
    ): PrivateChat
    updateManyPrivateChats(
      data: PrivateChatUpdateManyMutationInput!
      where: PrivateChatWhereInput
    ): BatchPayload!
    upsertPrivateChat(
      where: PrivateChatWhereUniqueInput!
      create: PrivateChatCreateInput!
      update: PrivateChatUpdateInput!
    ): PrivateChat!
    deletePrivateChat(where: PrivateChatWhereUniqueInput!): PrivateChat
    deleteManyPrivateChats(where: PrivateChatWhereInput): BatchPayload!
    createUser(data: UserCreateInput!): User!
    updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
    updateManyUsers(
      data: UserUpdateManyMutationInput!
      where: UserWhereInput
    ): BatchPayload!
    upsertUser(
      where: UserWhereUniqueInput!
      create: UserCreateInput!
      update: UserUpdateInput!
    ): User!
    deleteUser(where: UserWhereUniqueInput!): User
    deleteManyUsers(where: UserWhereInput): BatchPayload!
  }

  enum MutationType {
    CREATED
    UPDATED
    DELETED
  }

  interface Node {
    id: ID!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type PrivateChat {
    id: ID!
    participateA: User!
    participateB: User!
    messages(
      where: MessageWhereInput
      orderBy: MessageOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [Message!]
    createdAt: DateTime!
    lastSentMessageAt: DateTime!
  }

  type PrivateChatConnection {
    pageInfo: PageInfo!
    edges: [PrivateChatEdge]!
    aggregate: AggregatePrivateChat!
  }

  input PrivateChatCreateInput {
    id: ID
    participateA: UserCreateOneInput!
    participateB: UserCreateOneInput!
    messages: MessageCreateManyInput
    lastSentMessageAt: DateTime!
  }

  type PrivateChatEdge {
    node: PrivateChat!
    cursor: String!
  }

  enum PrivateChatOrderByInput {
    id_ASC
    id_DESC
    createdAt_ASC
    createdAt_DESC
    lastSentMessageAt_ASC
    lastSentMessageAt_DESC
  }

  type PrivateChatPreviousValues {
    id: ID!
    createdAt: DateTime!
    lastSentMessageAt: DateTime!
  }

  type PrivateChatSubscriptionPayload {
    mutation: MutationType!
    node: PrivateChat
    updatedFields: [String!]
    previousValues: PrivateChatPreviousValues
  }

  input PrivateChatSubscriptionWhereInput {
    mutation_in: [MutationType!]
    updatedFields_contains: String
    updatedFields_contains_every: [String!]
    updatedFields_contains_some: [String!]
    node: PrivateChatWhereInput
    AND: [PrivateChatSubscriptionWhereInput!]
    OR: [PrivateChatSubscriptionWhereInput!]
    NOT: [PrivateChatSubscriptionWhereInput!]
  }

  input PrivateChatUpdateInput {
    participateA: UserUpdateOneRequiredInput
    participateB: UserUpdateOneRequiredInput
    messages: MessageUpdateManyInput
    lastSentMessageAt: DateTime
  }

  input PrivateChatUpdateManyMutationInput {
    lastSentMessageAt: DateTime
  }

  input PrivateChatWhereInput {
    id: ID
    id_not: ID
    id_in: [ID!]
    id_not_in: [ID!]
    id_lt: ID
    id_lte: ID
    id_gt: ID
    id_gte: ID
    id_contains: ID
    id_not_contains: ID
    id_starts_with: ID
    id_not_starts_with: ID
    id_ends_with: ID
    id_not_ends_with: ID
    participateA: UserWhereInput
    participateB: UserWhereInput
    messages_every: MessageWhereInput
    messages_some: MessageWhereInput
    messages_none: MessageWhereInput
    createdAt: DateTime
    createdAt_not: DateTime
    createdAt_in: [DateTime!]
    createdAt_not_in: [DateTime!]
    createdAt_lt: DateTime
    createdAt_lte: DateTime
    createdAt_gt: DateTime
    createdAt_gte: DateTime
    lastSentMessageAt: DateTime
    lastSentMessageAt_not: DateTime
    lastSentMessageAt_in: [DateTime!]
    lastSentMessageAt_not_in: [DateTime!]
    lastSentMessageAt_lt: DateTime
    lastSentMessageAt_lte: DateTime
    lastSentMessageAt_gt: DateTime
    lastSentMessageAt_gte: DateTime
    AND: [PrivateChatWhereInput!]
    OR: [PrivateChatWhereInput!]
    NOT: [PrivateChatWhereInput!]
  }

  input PrivateChatWhereUniqueInput {
    id: ID
  }

  type Query {
    category(where: CategoryWhereUniqueInput!): Category
    categories(
      where: CategoryWhereInput
      orderBy: CategoryOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [Category]!
    categoriesConnection(
      where: CategoryWhereInput
      orderBy: CategoryOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): CategoryConnection!
    chat(where: ChatWhereUniqueInput!): Chat
    chats(
      where: ChatWhereInput
      orderBy: ChatOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [Chat]!
    chatsConnection(
      where: ChatWhereInput
      orderBy: ChatOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): ChatConnection!
    groupChat(where: GroupChatWhereUniqueInput!): GroupChat
    groupChats(
      where: GroupChatWhereInput
      orderBy: GroupChatOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [GroupChat]!
    groupChatsConnection(
      where: GroupChatWhereInput
      orderBy: GroupChatOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): GroupChatConnection!
    message(where: MessageWhereUniqueInput!): Message
    messages(
      where: MessageWhereInput
      orderBy: MessageOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [Message]!
    messagesConnection(
      where: MessageWhereInput
      orderBy: MessageOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): MessageConnection!
    privateChat(where: PrivateChatWhereUniqueInput!): PrivateChat
    privateChats(
      where: PrivateChatWhereInput
      orderBy: PrivateChatOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [PrivateChat]!
    privateChatsConnection(
      where: PrivateChatWhereInput
      orderBy: PrivateChatOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): PrivateChatConnection!
    user(where: UserWhereUniqueInput!): User
    users(
      where: UserWhereInput
      orderBy: UserOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [User]!
    usersConnection(
      where: UserWhereInput
      orderBy: UserOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): UserConnection!
    node(id: ID!): Node
  }

  type Subscription {
    category(where: CategorySubscriptionWhereInput): CategorySubscriptionPayload
    chat(where: ChatSubscriptionWhereInput): ChatSubscriptionPayload
    groupChat(
      where: GroupChatSubscriptionWhereInput
    ): GroupChatSubscriptionPayload
    message(where: MessageSubscriptionWhereInput): MessageSubscriptionPayload
    privateChat(
      where: PrivateChatSubscriptionWhereInput
    ): PrivateChatSubscriptionPayload
    user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  }

  type User {
    id: ID!
    nickname: String!
  }

  type UserConnection {
    pageInfo: PageInfo!
    edges: [UserEdge]!
    aggregate: AggregateUser!
  }

  input UserCreateInput {
    id: ID
    nickname: String!
  }

  input UserCreateManyInput {
    create: [UserCreateInput!]
    connect: [UserWhereUniqueInput!]
  }

  input UserCreateOneInput {
    create: UserCreateInput
    connect: UserWhereUniqueInput
  }

  type UserEdge {
    node: User!
    cursor: String!
  }

  enum UserOrderByInput {
    id_ASC
    id_DESC
    nickname_ASC
    nickname_DESC
  }

  type UserPreviousValues {
    id: ID!
    nickname: String!
  }

  input UserScalarWhereInput {
    id: ID
    id_not: ID
    id_in: [ID!]
    id_not_in: [ID!]
    id_lt: ID
    id_lte: ID
    id_gt: ID
    id_gte: ID
    id_contains: ID
    id_not_contains: ID
    id_starts_with: ID
    id_not_starts_with: ID
    id_ends_with: ID
    id_not_ends_with: ID
    nickname: String
    nickname_not: String
    nickname_in: [String!]
    nickname_not_in: [String!]
    nickname_lt: String
    nickname_lte: String
    nickname_gt: String
    nickname_gte: String
    nickname_contains: String
    nickname_not_contains: String
    nickname_starts_with: String
    nickname_not_starts_with: String
    nickname_ends_with: String
    nickname_not_ends_with: String
    AND: [UserScalarWhereInput!]
    OR: [UserScalarWhereInput!]
    NOT: [UserScalarWhereInput!]
  }

  type UserSubscriptionPayload {
    mutation: MutationType!
    node: User
    updatedFields: [String!]
    previousValues: UserPreviousValues
  }

  input UserSubscriptionWhereInput {
    mutation_in: [MutationType!]
    updatedFields_contains: String
    updatedFields_contains_every: [String!]
    updatedFields_contains_some: [String!]
    node: UserWhereInput
    AND: [UserSubscriptionWhereInput!]
    OR: [UserSubscriptionWhereInput!]
    NOT: [UserSubscriptionWhereInput!]
  }

  input UserUpdateDataInput {
    nickname: String
  }

  input UserUpdateInput {
    nickname: String
  }

  input UserUpdateManyDataInput {
    nickname: String
  }

  input UserUpdateManyInput {
    create: [UserCreateInput!]
    update: [UserUpdateWithWhereUniqueNestedInput!]
    upsert: [UserUpsertWithWhereUniqueNestedInput!]
    delete: [UserWhereUniqueInput!]
    connect: [UserWhereUniqueInput!]
    set: [UserWhereUniqueInput!]
    disconnect: [UserWhereUniqueInput!]
    deleteMany: [UserScalarWhereInput!]
    updateMany: [UserUpdateManyWithWhereNestedInput!]
  }

  input UserUpdateManyMutationInput {
    nickname: String
  }

  input UserUpdateManyWithWhereNestedInput {
    where: UserScalarWhereInput!
    data: UserUpdateManyDataInput!
  }

  input UserUpdateOneRequiredInput {
    create: UserCreateInput
    update: UserUpdateDataInput
    upsert: UserUpsertNestedInput
    connect: UserWhereUniqueInput
  }

  input UserUpdateWithWhereUniqueNestedInput {
    where: UserWhereUniqueInput!
    data: UserUpdateDataInput!
  }

  input UserUpsertNestedInput {
    update: UserUpdateDataInput!
    create: UserCreateInput!
  }

  input UserUpsertWithWhereUniqueNestedInput {
    where: UserWhereUniqueInput!
    update: UserUpdateDataInput!
    create: UserCreateInput!
  }

  input UserWhereInput {
    id: ID
    id_not: ID
    id_in: [ID!]
    id_not_in: [ID!]
    id_lt: ID
    id_lte: ID
    id_gt: ID
    id_gte: ID
    id_contains: ID
    id_not_contains: ID
    id_starts_with: ID
    id_not_starts_with: ID
    id_ends_with: ID
    id_not_ends_with: ID
    nickname: String
    nickname_not: String
    nickname_in: [String!]
    nickname_not_in: [String!]
    nickname_lt: String
    nickname_lte: String
    nickname_gt: String
    nickname_gte: String
    nickname_contains: String
    nickname_not_contains: String
    nickname_starts_with: String
    nickname_not_starts_with: String
    nickname_ends_with: String
    nickname_not_ends_with: String
    AND: [UserWhereInput!]
    OR: [UserWhereInput!]
    NOT: [UserWhereInput!]
  }

  input UserWhereUniqueInput {
    id: ID
    nickname: String
  }
`
