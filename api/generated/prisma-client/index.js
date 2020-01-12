'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var prisma_lib_1 = require('prisma-client-lib')
var typeDefs = require('./prisma-schema').typeDefs

var models = [
  {
    name: 'User',
    embedded: false
  },
  {
    name: 'Message',
    embedded: false
  },
  {
    name: 'Category',
    embedded: false
  },
  {
    name: 'PrivateChat',
    embedded: false
  },
  {
    name: 'GroupChat',
    embedded: false
  }
]
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env['PRISMA_URL']}`
})
exports.prisma = new exports.Prisma()
