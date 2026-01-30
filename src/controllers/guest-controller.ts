import { Hono } from 'hono'
import { AddressService } from '../services/address-service.js'
import { ContactService } from '../services/contact-service.js'
import { GuestService } from '../services/guest-service.js'
import { logger } from '../utils/logger.js'

export const guestController = new Hono().basePath('/guest/contacts')

guestController.get('/', async (c) => {
  const username = 'dubiidooo'
  const request = {
    name: c.req.query('name') || null,
    email: c.req.query('email') || null,
    phone: c.req.query('phone') || null,
    page: parseInt(c.req.query('page') || '1'),
    size: parseInt(c.req.query('size') || '8'),
  }

  const user = await GuestService.getUserDefault(username)
  const result = await ContactService.search(user.id, request)

  logger.info('Success get all contacts data')
  return c.json({
    status: true,
    statusCode: 200,
    message: 'Success get all contacts data',
    data: result,
  })
})

guestController.get('/:contactId', async (c) => {
  const contactId = c.req.param('contactId')
  const username = 'dubiidooo'

  const user = await GuestService.getUserDefault(username)
  const userId = user.id

  const result = await ContactService.get(userId, contactId)

  logger.info('Success get contact detail data')
  return c.json({
    status: true,
    statusCode: 200,
    message: 'Success get contact detail data',
    data: result,
  })
})

guestController.get('/:contactId/addresses', async (c) => {
  const contactId = c.req.param('contactId')
  const username = 'dubiidooo'

  const user = await GuestService.getUserDefault(username)
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
