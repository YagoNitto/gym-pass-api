import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma.js'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const passwordHash = await hash(password, 8)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    await this.usersRepository.create({ name, email, passwordHash })
  }
}
