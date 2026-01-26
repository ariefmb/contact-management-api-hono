import { HTTPException } from 'hono/http-exception'
import { UserRegisterRequest, UserResponse } from '../models/user-model'
import { UserRepository } from '../repositories/user-repository'
import { hashing } from '../utils/hashing'
import { UserValidation } from '../validations/user-validation'

export class UserService {
  static register = async (request: UserRegisterRequest): Promise<UserResponse> => {
    request.id = Bun.randomUUIDv7()
    console.info('id', request.id)

    request = UserValidation.REGISTER.parse(request) as UserRegisterRequest

    const isUserExist = await UserRepository.findUniqueByUsername(request.username)

    if (isUserExist) {
      throw new HTTPException(409, {
        message: 'Username already exists',
      })
    }

    const hashedPassword = hashing(request.password)

    const payload = {
      id: request.id,
      username: request.username,
      password: hashedPassword,
      name: request.name,
    }

    return await UserRepository.register(payload)
  }
}
