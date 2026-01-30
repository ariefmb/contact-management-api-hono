import 'dotenv/config'
import { logger } from '../utils/logger'

const CONFIG = {
  db_url: Bun.env.DATABASE_URL,
  db_port: Bun.env.DATABASE_PORT,
  db_host: Bun.env.DATABASE_HOST,
  db_user: Bun.env.DATABASE_USER,
  db_pass: Bun.env.DATABASE_PASSWORD,
  db_name: Bun.env.DATABASE_NAME,
  jwt_secret_key: Bun.env.JWT_SECRET_KEY,
}

if (!CONFIG.db_url) {
  logger.error('Missing environment variable: DATABASE_URL')
  process.exit(1)
}

if (!CONFIG.db_port) {
  logger.error('Missing environment variable: DATABASE_PORT')
  process.exit(1)
}

if (!CONFIG.db_host) {
  logger.error('Missing environment variable: DATABASE_HOST')
  process.exit(1)
}

if (!CONFIG.db_user) {
  logger.error('Missing environment variable: DATABASE_USER')
  process.exit(1)
}

if (!CONFIG.db_name) {
  logger.error('Missing environment variable: DATABASE_NAME')
  process.exit(1)
}

if (!CONFIG.jwt_secret_key) {
  logger.error('Missing environment variable: JWT_SECRET_KEY')
  process.exit(1)
}

export default CONFIG
