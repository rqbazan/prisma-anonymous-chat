import { Prisma } from '@prisma'
import { Request } from 'express'

export interface GraphQLServerContext {
  prisma: Prisma
  req: Request
  userId?: string
}

export interface Resolver<R, P = {}, A = { [key: string]: any }> {
  (parent: P, args: A, ctx: GraphQLServerContext): R | Promise<R>
}

export interface Channel {
  id: string
  type: 'p' | 'g'
}
