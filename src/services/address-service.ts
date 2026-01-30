import { HTTPException } from 'hono/http-exception'
import { AddressCreateRequest, AddressResponse } from '../models/address-model'
import { AddressRepository } from '../repositories/address-repository'
import { ContactRepository } from '../repositories/contact-repository'
import { logger } from '../utils/logger'

export class AddressService {
  static checkContactExist = async (userId: string, contactId: string) => {
    const totalContactInDB = await ContactRepository.count(userId, contactId)

    if (totalContactInDB !== 1) {
      logger.error('Contact data is not found')
      throw new HTTPException(404, { message: 'Contact data is not found' })
    }

    return contactId
  }

  static create = async (
    userId: string,
    contactId: string,
    request: AddressCreateRequest,
  ): Promise<AddressResponse> => {
    contactId = await this.checkContactExist(userId, contactId)

    return await AddressRepository.create(request)
  }

  static get = async (userId: string, contactId: string, addressId: string): Promise<AddressResponse | null> => {
    contactId = await this.checkContactExist(userId, contactId)

    const address = await AddressRepository.get(addressId, contactId)

    if (!address) {
      logger.info('Address data is not found')
      throw new HTTPException(404, { message: 'Address data is not found' })
    }

    return address
  }

  static getList = async (userId: string, contactId: string): Promise<AddressResponse[] | null> => {
    contactId = await this.checkContactExist(userId, contactId)

    return await AddressRepository.getList(contactId)
  }

  static update = async (
    userId: string,
    contactId: string,
    addressId: string,
    request: AddressCreateRequest,
  ): Promise<AddressResponse> => {
    contactId = await this.checkContactExist(userId, contactId)

    const totalAddressInDB = await AddressRepository.count(contactId, addressId)

    if (totalAddressInDB !== 1) {
      logger.error('Address data is not found')
      throw new HTTPException(404, { message: 'Address data is not found' })
    }

    return await AddressRepository.update(addressId, request)
  }

  static delete = async (userId: string, contactId: string, addressId: string) => {
    contactId = await this.checkContactExist(userId, contactId)

    const totalAddressInDB = await AddressRepository.count(contactId, addressId)

    if (totalAddressInDB !== 1) {
      logger.error('Address data is not found')
      throw new HTTPException(404, { message: 'Address data is not found' })
    }

    return await AddressRepository.delete(addressId)
  }
}
