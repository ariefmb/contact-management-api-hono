import { UserInterface, UserRegisterRequest, UserResponse } from '../models/user-model'
import prismaClient from '../utils/database'

export class UserRepository {
  static register = async (payload: UserRegisterRequest): Promise<UserResponse> => {
    return await prismaClient.users.create({
      data: payload,
      select: {
        id: true,
        username: true,
        name: true,
      },
    })
  }

  static findUniqueByUsername = async (username: string): Promise<UserInterface | null> => {
    return await prismaClient.users.findUnique({
      where: {
        username: username,
      },
    })
  }

  static findUniqueById = async (id: string): Promise<UserInterface | null> => {
    return await prismaClient.users.findUnique({
      where: {
        id: id,
      },
    })
  }

  static findFirstByUsername = async (username: string): Promise<UserResponse | null> => {
    return await prismaClient.users.findFirst({
      where: {
        username: username,
      },
      select: {
        id: true,
        username: true,
        name: true,
      },
    })
  }
}
