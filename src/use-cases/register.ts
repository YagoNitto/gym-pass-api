import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma.js'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository.js'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const passwordHash = await hash(password, 8)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  prismaUsersRepository.create({ name, email, passwordHash })
}
