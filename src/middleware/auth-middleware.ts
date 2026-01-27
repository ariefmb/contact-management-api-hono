import { HTTPException } from 'hono/http-exception'
import { UserInterface } from '../models/user-model'
import { UserRepository } from '../repositories/user-repository'
import { verifyJWT } from '../utils/jwt'
import { logger } from '../utils/logger'
import {} from 'hono/'

// type Variables = {
//   message: string
//   user: UserInterface
// }

// export const authMiddleware = new Hono<{ Variables: Variables }>()
const authMiddleware = async (c: any, next: any) => {
  // authMiddleware.use(async (c, next) => {
  const token = c.req.header('Authorization')?.replace(/^Bearer\s/, '')

  console.log('authMid token:', token)

  const { valid, expired, decoded }: any = await verifyJWT(token!)

  if (!valid) {
    logger.error(`ERR: token = ${expired ? 'Token expired' : 'Invalid token'}`)
    throw new HTTPException(401, { message: expired ? 'Token expired' : 'Invalid token' })
  }

  if (decoded?.type !== 'access') {
    logger.error('ERR: token = Invalid token type')
    throw new HTTPException(401, { message: 'Invalid token type' })
  }

  const user = await UserRepository.findUniqueById(decoded.sub)

  if (!user) {
    logger.error('ERR: token = Unauthorized')
    throw new HTTPException(401, { message: 'Unauthorized' })
  }

  if (user.tokenVersion !== decoded.tokenVersion) {
    logger.error('ERR: token = Token revoked')
    throw new HTTPException(401, { message: 'Token revoked' })
  }

  c.set('user', user)
  await next()
}

export default authMiddleware
