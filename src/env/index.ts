import 'dotenv/config'
import { z } from 'zod/v4'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables.', z.flattenError(_env.error))

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
