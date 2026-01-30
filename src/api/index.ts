import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { HTTPException } from 'hono/http-exception'
import { ZodError } from 'zod'
import { addressController } from '../controllers/address-controller.js'
import { contactController } from '../controllers/contact-controller.js'
import { guestController } from '../controllers/guest-controller.js'
import { userController } from '../controllers/user-controller.js'

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

app.route('/api', userController)
app.route('/api', contactController)
app.route('/api', addressController)
app.route('/api', guestController)

app.onError(async (err, c) => {
  if (err instanceof HTTPException) {
    c.status(err.status)
    return c.json({
      status: false,
      statusCode: err.status,
      errors: err.message,
    })
  }

  if (err instanceof ZodError) {
    c.status(422)
    return c.json({
      status: false,
      statusCode: 422,
      errors: err.message,
    })
  }

  c.status(500)
  return c.json({
    status: false,
    statusCode: 500,
    errors: err.message || 'Internal Server Error',
  })
})

export default app
