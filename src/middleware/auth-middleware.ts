import { HTTPException } from 'hono/http-exception'
// import { UserInterface } from '../models/user-model'
// import { ApplicationVariables } from '../models/application-variables'
import { createMiddleware } from 'hono/factory'
import { ApplicationVariables, JWTVerifyVariables } from '../models/helper-model'
import { UserRepository } from '../repositories/user-repository'
import { verifyJWT } from '../utils/jwt'
import { logger } from '../utils/logger'

const authMiddleware = createMiddleware<{ Variables: ApplicationVariables }>(async (c, next) => {
  const token = c.req.header('Authorization')?.replace(/^Bearer\s/, '')

  const { valid, expired, decoded } = (await verifyJWT(token!)) as JWTVerifyVariables

  if (!valid) {
    logger.error(`token = ${expired ? 'Token expired' : 'Invalid token'}`)
    throw new HTTPException(401, { message: expired ? 'Token expired' : 'Invalid token' })
  }

  if (decoded?.type !== 'access') {
    logger.error('token = Invalid token type')
    throw new HTTPException(401, { message: 'Invalid token type' })
  }

  const user = await UserRepository.findUniqueById(decoded.sub)

  if (!user) {
    logger.error('token = Unauthorized')
    throw new HTTPException(401, { message: 'Unauthorized' })
  }

  if (user.tokenVersion !== decoded.tokenVersion) {
    logger.error('token = Token revoked')
    throw new HTTPException(401, { message: 'Token revoked' })
  }

  c.set('user', user)
  await next()
})

export default authMiddleware
