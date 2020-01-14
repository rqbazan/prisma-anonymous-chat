import { Prisma, PrivateChat, GroupChat } from '@prisma'
import { Request } from 'express'

export interface Context {
  prisma: Prisma
  req: Request
  userId?: string
}

export interface Resolver<R, P = {}, A = { [key: string]: any }> {
  (parent: P, args: A, ctx: Context): R | Promise<R>
}

export enum ChannelType {
  PRIVATE = 'p',
  GROUP = 'g'
}

export interface Channel {
  id: string
  type: ChannelType
}

export type WellKnowChat = (PrivateChat | GroupChat) & { type: ChannelType }
