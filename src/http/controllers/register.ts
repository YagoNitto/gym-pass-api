import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod/v4'
import { prisma } from '@/lib/prisma.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: password,
    },
  })

  return reply.status(201).send({ id: user.id })
}
