import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { ZodError } from 'zod'
import { addressController } from './controllers/address-controller'
import { contactController } from './controllers/contact-controller'
import { userController } from './controllers/user-controller'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/', userController)
app.route('/', contactController)
app.route('/', addressController)

app.onError(async (err, c) => {
  if (err instanceof HTTPException) {
    c.status(err.status)
    return c.json({
      status: false,
      statusCode: err.status,
      message: err.message,
    })
  }

  if (err instanceof ZodError) {
    c.status(422)
    return c.json({
      status: false,
      statusCode: 422,
      message: err.message,
    })
  }

  c.status(500)
  return c.json({
    status: false,
    statusCode: 500,
    message: err.message || 'Internal Server Error',
  })
})

export default app
