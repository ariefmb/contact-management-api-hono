import { ContactAddRequest, ContactResponse, ContactUpdateRequest } from '../models/contact-model'
import prismaClient from '../utils/database'

export class ContactRepository {
  static create = async (payload: ContactAddRequest): Promise<ContactResponse> => {
    return await prismaClient.contacts.create({
      data: payload,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
      },
    })
  }

  static get = async (userId: string, contactId: string): Promise<ContactResponse | null> => {
    return await prismaClient.contacts.findFirst({
      where: {
        user_id: userId,
        id: contactId,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
      },
    })
  }

  static count = async (userId: string, contactId: string): Promise<number> => {
    return await prismaClient.contacts.count({
      where: {
        user_id: userId,
        id: contactId,
      },
    })
  }

  static update = async (
    userId: string,
    contactId: string,
    payload: ContactUpdateRequest,
  ): Promise<ContactResponse> => {
    return await prismaClient.contacts.update({
      where: {
        user_id: userId,
        id: contactId,
      },
      data: payload,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
      },
    })
  }

  static delete = async (userId: string, contactId: string) => {
    return await prismaClient.contacts.delete({
      where: {
        user_id: userId,
        id: contactId,
      },
    })
  }

  static findMany = async (filters: Array<Record<string, unknown>>, size: number, skip: number) => {
    return await prismaClient.contacts.findMany({
      where: {
        AND: filters,
      },
      take: size,
      skip: skip,
    })
  }

  static countFilters = async (filters: Array<Record<string, unknown>>) => {
    return await prismaClient.contacts.count({
      where: {
        AND: filters,
      },
    })
  }
}
