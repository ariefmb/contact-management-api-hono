import { UserInterface, UserRegisterRequest, UserResponse, UserUpdateRequest } from '../models/user-model.js'
import prismaClient from '../utils/database.js'

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

  static findUniqueById = async (userId: string): Promise<UserInterface | null> => {
    return await prismaClient.users.findUnique({
      where: {
        id: userId,
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

  static updateTokenVersion = async (userId: string) => {
    return await prismaClient.users.update({
      where: {
        id: userId,
      },
      data: {
        tokenVersion: {
          increment: 1,
        },
      },
    })
  }

  static count = async (userId: string) => {
    return await prismaClient.users.count({
      where: {
        id: userId,
      },
    })
  }

  static update = async (userId: string, payload: UserUpdateRequest) => {
    return await prismaClient.users.update({
      where: {
        id: userId,
      },
      data: payload,
      select: {
        id: true,
        username: true,
        name: true,
      },
    })
  }
}
