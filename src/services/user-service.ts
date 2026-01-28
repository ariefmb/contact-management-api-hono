import { HTTPException } from 'hono/http-exception'
import { UserLoginRequest, UserLoginResponse, UserRegisterRequest, UserResponse } from '../models/user-model'
import { UserRepository } from '../repositories/user-repository'
import { hashing, verifyHashing } from '../utils/hashing'
import { signJWT } from '../utils/jwt'
import { UserValidation } from '../validations/user-validation'

export class UserService {
  static register = async (request: UserRegisterRequest): Promise<UserResponse> => {
    request.id = crypto.randomUUID()

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

  static login = async (request: UserLoginRequest): Promise<UserLoginResponse> => {
    request = UserValidation.LOGIN.parse(request) as UserLoginRequest

    const user = await UserRepository.findUniqueByUsername(request.username)

    if (!user) {
      throw new HTTPException(404, {
        message: 'Username or Password is incorrect',
      })
    }

    const isPassVerified = verifyHashing(request.password, user.password)

    if (!isPassVerified) {
      throw new HTTPException(404, {
        message: 'Username or Password is incorrect',
      })
    }

    const accessPayload = {
      sub: user.id,
      tokenVersion: user.tokenVersion,
      type: 'access',
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
    }

    const refreshPayload = {
      sub: user.id,
      tokenVersion: user.tokenVersion,
      type: 'refresh',
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
    }

    const accessToken = await signJWT(accessPayload)
    const refreshToken = await signJWT(refreshPayload)

    return {
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
      },
      accessToken,
      refreshToken,
    }
  }
}
