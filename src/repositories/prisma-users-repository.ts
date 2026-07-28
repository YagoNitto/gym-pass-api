import type { Prisma } from '@/generated/prisma/client.js'
import { prisma } from '@/lib/prisma.js'

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
