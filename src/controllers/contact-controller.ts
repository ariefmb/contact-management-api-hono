import { sValidator } from '@hono/standard-validator'
import { Hono } from 'hono'
import authMiddleware from '../middleware/auth-middleware'
import { ContactAddRequest, ContactUpdateRequest } from '../models/contact-model'
import { ApplicationVariables } from '../models/helper-model'
import { UserResponse } from '../models/user-model'
import { ContactService } from '../services/contact-service'
import { logger } from '../utils/logger'
import { ContactValidation } from '../validations/contact-validation'

export const contactController = new Hono<{ Variables: ApplicationVariables }>().basePath('/contacts')

contactController.post('/create', authMiddleware, sValidator('json', ContactValidation.ADD), async (c) => {
  const request = c.req.valid('json') as ContactAddRequest
  const user = c.get('user') as UserResponse
  request.id = crypto.randomUUID()
  request.user_id = user.id

  const result = await ContactService.add(request)

  logger.info('Success add new contact data')
  return c.json(
    {
      status: true,
      statusCode: 201,
      message: 'Success add new contact data',
      data: result,
    },
    {
      status: 201,
    },
  )
})

contactController.get('/:contactId', authMiddleware, async (c) => {
  const user = c.get('user') as UserResponse
  const userId = user.id
  const contactId = c.req.param('contactId')

  const result = await ContactService.get(userId, contactId)

  logger.info('Success get contact detail data')
  return c.json({
    status: true,
    statusCode: 200,
    message: 'Success get contact detail data',
    data: result,
  })
})

contactController.put('/:contactId/update', authMiddleware, sValidator('json', ContactValidation.UPDATE), async (c) => {
  const request = c.req.valid('json') as ContactUpdateRequest
  const user = c.get('user') as UserResponse
  const userId = user.id
  const contactId = c.req.param('contactId')

  const result = await ContactService.update(userId, contactId, request)

  logger.info('Success update contact data')
  return c.json({
    status: true,
    statusCode: 200,
    message: 'Success update contact data',
    data: result,
  })
})

contactController.delete('/:contactId/delete', authMiddleware, async (c) => {
  const user = c.get('user') as UserResponse
  const userId = user.id
  const contactId = c.req.param('contactId')

  await ContactService.delete(userId, contactId)

  logger.info('Success delete contact data')
  return c.json({
    status: true,
    statusCode: 200,
    message: 'Success delete contact data',
  })
})

contactController.get('/', authMiddleware, async (c) => {
  const user = c.get('user') as UserResponse
  const userId = user.id

  const request = {
    name: c.req.query('name') || null,
    email: c.req.query('email') || null,
    phone: c.req.query('phone') || null,
    page: parseInt(c.req.query('page') || '1'),
    size: parseInt(c.req.query('size') || '8'),
  }
  const result = await ContactService.search(userId, request)

  logger.info('Success search contacts data')
  return c.json({
    status: true,
    statusCode: 200,
    message: 'Success search contacts data',
    data: result.data,
    paging: result.paging,
  })
})
