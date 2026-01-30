import { sValidator } from '@hono/standard-validator'
import { Hono } from 'hono'
import authMiddleware from '../middleware/auth-middleware'
import { AddressCreateRequest } from '../models/address-model'
import { ApplicationVariables } from '../models/helper-model'
import { UserResponse } from '../models/user-model'
import { AddressService } from '../services/address-service'
import { logger } from '../utils/logger'
import { AddressValidation } from '../validations/address-validation'

export const addressController = new Hono<{ Variables: ApplicationVariables }>().basePath(
  '/contacts/:contactId/addresses',
)

addressController.use(authMiddleware)

addressController.post('/create', sValidator('json', AddressValidation.CREATE), async (c) => {
  const request = c.req.valid('json') as AddressCreateRequest
  const contactId = c.req.param('contactId')
  request.id = crypto.randomUUID()
  request.contact_id = contactId

  const user = c.get('user') as UserResponse
  const userId = user.id

  const result = await AddressService.create(userId, contactId, request)

  logger.info('Success create new address data')
  return c.json(
    {
      status: true,
      statusCode: 201,
      message: 'Success create new address data',
      data: result,
    },
    {
      status: 201,
    },
  )
})

addressController.get('/:addressId', async (c) => {
  const contactId = c.req.param('contactId')
  const addressId = c.req.param('addressId')
  const user = c.get('user') as UserResponse
  const userId = user.id

  const result = await AddressService.get(userId, contactId, addressId)

  logger.info('Success get address data')
  return c.json({
    status: true,
    statusCode: 200,
    message: 'Success get address data',
    data: result,
  })
})

addressController.get('/', async (c) => {
  const contactId = c.req.param('contactId')
  const user = c.get('user') as UserResponse
  const userId = user.id

  const result = await AddressService.getList(userId, contactId)

  logger.info('Success get all addresses data')
  return c.json({
    status: true,
    statusCode: 200,
    message: 'Success get all addresses data',
    data: result,
  })
})

addressController.put('/:addressId/update', sValidator('json', AddressValidation.UPDATE), async (c) => {
  const request = c.req.valid('json') as AddressCreateRequest
  const contactId = c.req.param('contactId')
  const addressId = c.req.param('addressId')
  const user = c.get('user') as UserResponse
  const userId = user.id

  const result = await AddressService.update(userId, contactId, addressId, request)

  logger.info('Success update address data')
  return c.json({
    status: true,
    statusCode: 200,
    message: 'Success update address data',
    data: result,
  })
})

addressController.delete('/:addressId/remove', async (c) => {
  const contactId = c.req.param('contactId')
  const addressId = c.req.param('addressId')
  const user = c.get('user') as UserResponse
  const userId = user.id

  await AddressService.delete(userId, contactId, addressId)

  logger.info('Success delete address data')
  return c.json({
    status: true,
    statusCode: 200,
    message: 'Success delete address data',
  })
})
