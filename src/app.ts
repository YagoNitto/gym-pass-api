import fastify from 'fastify'
import z, { ZodError } from 'zod'
import { env } from './env/index.js'
import { appRoutes } from './http/routes.js'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      errors: z.flattenError(error).fieldErrors,
    })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
