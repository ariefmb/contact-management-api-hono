import { Hono } from 'hono'
import { setCookie } from 'hono/cookie'
import authMiddleware from '../middleware/auth-middleware'
import { ApplicationVariables } from '../models/helper-model'
import { UserResponse } from '../models/user-model'
import { UserService } from '../services/user-service'
import { cookieOpts } from '../utils/cookieOpts'

export const userController = new Hono<{ Variables: ApplicationVariables }>().basePath('/users')

userController.post('/', async (c) => {
  const body = await c.req.json()

  const result = await UserService.register(body)

  c.status(201)
  return c.json({
    status: true,
    statusCode: 201,
    message: 'Success register new user',
    data: result,
  })
})

userController.post('/login', async (c) => {
  const body = await c.req.json()

  const result = await UserService.login(body)

  console.log('login result', result)

  setCookie(c, 'accessToken', result.accessToken, cookieOpts)
  return c.json({
    status: true,
    statusCode: 200,
    message: 'Success login user',
    data: result,
  })
})

// userController.use(authMiddleware)

userController.get('/current', authMiddleware, async (c) => {
  const { username } = c.get('user') as UserResponse

  console.log('get username:', username)

  const result = await UserService.getUser(username)

  return c.json({
    status: true,
    statusCode: 200,
    message: 'Success get user data',
    data: result,
  })
})
