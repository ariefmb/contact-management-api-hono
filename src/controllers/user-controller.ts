import { sValidator } from '@hono/standard-validator'
import { Hono } from 'hono'
import { deleteCookie, setCookie } from 'hono/cookie'
import authMiddleware from '../middleware/auth-middleware'
import { ApplicationVariables } from '../models/helper-model'
import {
  RefreshSessionRequest,
  UserLoginRequest,
  UserRegisterRequest,
  UserResponse,
  UserUpdateRequest,
} from '../models/user-model'
import { UserService } from '../services/user-service'
import { cookieOpts } from '../utils/cookieOpts'
import { logger } from '../utils/logger'
import { UserValidation } from '../validations/user-validation'

export const userController = new Hono<{ Variables: ApplicationVariables }>().basePath('/users')

userController.post('/', sValidator('json', UserValidation.REGISTER), async (c) => {
  const request = c.req.valid('json') as UserRegisterRequest
  request.id = crypto.randomUUID()

  const result = await UserService.register(request)

  logger.info('users - register = Success register new user')
  return c.json(
    {
      status: true,
      statusCode: 201,
      message: 'Success register new user',
      data: result,
    },
    {
      status: 201,
    },
  )
})

userController.post('/login', sValidator('json', UserValidation.LOGIN), async (c) => {
  const request = c.req.valid('json') as UserLoginRequest
  const result = await UserService.login(request)

  setCookie(c, 'accessToken', result.accessToken, cookieOpts)

  logger.info('users - login = Success login user')
  return c.json({
    status: true,
    statusCode: 200,
    message: 'Success login user',
    data: result,
  })
})

userController.post('/refresh', sValidator('json', UserValidation.REFRESH), async (c) => {
  const { refreshToken } = c.req.valid('json') as RefreshSessionRequest
  const result = await UserService.refreshSession(refreshToken)

  setCookie(c, 'accessToken', result.accessToken, cookieOpts)

  logger.info('users - refreshSession = Success refresh session')
  return c.json({
    status: true,
    statusCode: 200,
    message: 'Success refresh session',
    data: result,
  })
})

userController.get('/current', authMiddleware, async (c) => {
  const { username } = c.get('user') as UserResponse

  const result = await UserService.get(username)

  logger.info('users - get = Success get user data')
  return c.json({
    status: true,
    statusCode: 200,
    message: 'Success get user data',
    data: result,
  })
})

userController.patch('/current/update', authMiddleware, sValidator('json', UserValidation.UPDATE), async (c) => {
  const user = c.get('user')
  const userId = user.id
  const request = c.req.valid('json') as UserUpdateRequest

  const result = await UserService.update(userId, request)

  logger.info('users - update = Success update user data')
  return c.json({
    status: true,
    statusCode: 200,
    message: 'Success update user data',
    data: result,
  })
})

userController.post('/logout', authMiddleware, async (c) => {
  const user = c.get('user')
  const userId = user.id

  await UserService.logout(userId)
  deleteCookie(c, 'accessToken', cookieOpts)

  logger.info('users - logout = Success logout user')
  return c.json({
    status: true,
    statusCode: 200,
    message: 'Success logout user',
  })
})
