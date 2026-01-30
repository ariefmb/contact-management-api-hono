import { AddressCreateRequest, AddressResponse } from '../models/address-model.js'
import prismaClient from '../utils/database.js'

export class AddressRepository {
  static create = async (payload: AddressCreateRequest): Promise<AddressResponse> => {
    return await prismaClient.address.create({
      data: payload,
      select: {
        id: true,
        title: true,
        street: true,
        city: true,
        province: true,
        country: true,
        postal_code: true,
      },
    })
  }

  static get = async (addressId: string, contactId: string): Promise<AddressResponse | null> => {
    return await prismaClient.address.findFirst({
      where: {
        contact_id: contactId,
        id: addressId,
      },
      select: {
        id: true,
        title: true,
        street: true,
        city: true,
        province: true,
        country: true,
        postal_code: true,
      },
    })
  }

  static getList = async (contactId: string): Promise<AddressResponse[] | null> => {
    return await prismaClient.address.findMany({
      where: {
        contact_id: contactId,
      },
      select: {
        id: true,
        title: true,
        street: true,
        city: true,
        province: true,
        country: true,
        postal_code: true,
      },
    })
  }

  static count = async (contactId: string, addressId: string): Promise<number> => {
    return await prismaClient.address.count({
      where: {
        contact_id: contactId,
        id: addressId,
      },
    })
  }

  static update = async (addressId: string, payload: AddressCreateRequest): Promise<AddressResponse> => {
    return await prismaClient.address.update({
      where: {
        id: addressId,
      },
      data: payload,
      select: {
        id: true,
        title: true,
        street: true,
        city: true,
        province: true,
        country: true,
        postal_code: true,
      },
    })
  }

  static delete = async (addressId: string) => {
    return await prismaClient.address.delete({
      where: {
        id: addressId,
      },
    })
  }
}
