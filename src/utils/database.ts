import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '@prisma/client'
import CONFIG from '../config/environment.js'
import { logger } from './logger.js'

declare global {
  var prismaClient: InstanceType<typeof PrismaClient>
}

const adapter = new PrismaMariaDb({
  host: CONFIG.db_host,
  port: Number(CONFIG.db_port),
  user: CONFIG.db_user,
  password: CONFIG.db_pass,
  database: CONFIG.db_name,
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
