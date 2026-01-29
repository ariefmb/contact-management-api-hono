import { HTTPException } from 'hono/http-exception'
import { ContactAddRequest, ContactResponse, ContactSearchRequest, ContactUpdateRequest } from '../models/contact-model'
import { ContactRepository } from '../repositories/contact-repository'
import { logger } from '../utils/logger'

export class ContactService {
  static add = async (request: ContactAddRequest): Promise<ContactResponse> => {
    return await ContactRepository.create(request)
  }

  static get = async (userId: string, contactId: string): Promise<ContactResponse | null> => {
    const contact = await ContactRepository.get(userId, contactId)

    if (!contact) {
      logger.error('Contact data is not found')
      throw new HTTPException(404, { message: 'Contact data is not found' })
    }

    return contact
  }

  static update = async (
    userId: string,
    contactId: string,
    request: ContactUpdateRequest,
  ): Promise<ContactResponse> => {
    const totalContactInDB = await ContactRepository.count(userId, contactId)

    if (totalContactInDB !== 1) {
      logger.error('Contact data is not found')
      throw new HTTPException(404, { message: 'Contact data is not found' })
    }

    return await ContactRepository.update(userId, contactId, request)
  }

  static delete = async (userId: string, contactId: string) => {
    return await ContactRepository.delete(userId, contactId)
  }

  static search = async (userId: string, request: ContactSearchRequest) => {
    // skip = ((page - 1) * size)
    const skip = (request.page - 1) * request.size

    const filters = []

    filters.push({
      user_id: userId,
    })
    if (request.name) {
      filters.push({
        OR: [
          {
            first_name: {
              contains: request.name,
            },
          },
          {
            last_name: {
              contains: request.name,
            },
          },
        ],
      })
    }
    if (request.email) {
      filters.push({
        email: {
          contains: request.email,
        },
      })
    }
    if (request.phone) {
      filters.push({
        phone: {
          contains: request.phone,
        },
      })
    }

    const contacts = await ContactRepository.findMany(filters, request.size, skip)
    const totalItems = await ContactRepository.countFilters(filters)

    return {
      data: contacts,
      paging: {
        page: request.page,
        total_item: totalItems,
        total_page: Math.ceil(totalItems / request.size),
      },
    }
  }
}
