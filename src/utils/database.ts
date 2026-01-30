import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '@prisma/client'
import { logger } from './logger'

const adapter = new PrismaMariaDb({
  host: Bun.env.DATABASE_HOST,
  port: Number(Bun.env.DATABASE_PORT),
  user: Bun.env.DATABASE_USER,
  password: Bun.env.DATABASE_PASSWORD,
  database: Bun.env.DATABASE_NAME,
  connectionLimit: 3,
})

const prismaClient = new PrismaClient({
  adapter,
  log: [
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
})

prismaClient.$on('error', (e) => {
  logger.error(e)
})

prismaClient.$on('warn', (e) => {
  logger.warn(e)
})

export default prismaClient
