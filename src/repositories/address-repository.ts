import { AddressCreateRequest, AddressResponse } from '../models/address-model'
import prismaClient from '../utils/database'

export class AddressRepository {
  static create = async (payload: AddressCreateRequest): Promise<AddressResponse> => {
    return await prismaClient.addresses.create({
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
    return await prismaClient.addresses.findFirst({
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
    return await prismaClient.addresses.findMany({
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
    return await prismaClient.addresses.count({
      where: {
        id: addressId,
      },
    })
  }

  static update = async (addressId: string, payload: AddressCreateRequest): Promise<AddressResponse> => {
    return await prismaClient.addresses.update({
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
    return await prismaClient.addresses.delete({
      where: {
        id: addressId,
      },
    })
  }
}
