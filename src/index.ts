import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { HTTPException } from 'hono/http-exception'
import { ZodError } from 'zod'
import { addressController } from './controllers/address-controller'
import { contactController } from './controllers/contact-controller'
import { guestController } from './controllers/guest-controller'
import { userController } from './controllers/user-controller'

const app = new Hono()

const allowedOrigins = ['http://localhost:5173', 'https://contact-management-ariefmb.vercel.app']

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
)

app.get('/', (c) => {
  return c.text('Contact Management API - created using Bun & Hono!')
})

app.route('/', userController)
app.route('/', contactController)
app.route('/', addressController)
app.route('/', guestController)

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
