import { Hono } from 'hono'
import { UserService } from '../services/user-service'

export const userController = new Hono().basePath('/users')

userController.post('/', async (c) => {
  const body = await c.req.json()

  console.info('body', body)
  const data = await UserService.register(body)

  c.status(201)
  return c.json({
    status: true,
    statusCode: 201,
    message: 'Success register new user',
    data: data,
  })
})
