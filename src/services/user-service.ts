import { HTTPException } from 'hono/http-exception'
import { JWTVerifyVariables } from '../models/helper-model'
import {
  UserLoginRequest,
  UserRegisterRequest,
  UserResponse,
  UserTokenResponse,
  UserUpdateRequest,
} from '../models/user-model'
import { UserRepository } from '../repositories/user-repository'
import { hashing, verifyHashing } from '../utils/hashing'
import { signJWT, verifyJWT } from '../utils/jwt'
import { logger } from '../utils/logger'

export class UserService {
  static register = async (request: UserRegisterRequest): Promise<UserResponse> => {
    const isUserExist = await UserRepository.findUniqueByUsername(request.username)

    if (isUserExist) {
      logger.error('users - register = Username already exists')
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

  static login = async (request: UserLoginRequest): Promise<UserTokenResponse> => {
    const user = await UserRepository.findUniqueByUsername(request.username)

    if (!user) {
      logger.error('users - login = Username or Password is incorrect')
      throw new HTTPException(404, {
        message: 'Username or Password is incorrect',
      })
    }

    const isPassVerified = verifyHashing(request.password, user.password)

    if (!isPassVerified) {
      logger.error('users - login = Username or Password is incorrect')
      throw new HTTPException(404, {
        message: 'Username or Password is incorrect',
      })
    }

    const accessPayload = {
      sub: user.id,
      tokenVersion: user.tokenVersion,
      type: 'access',
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    }

    const refreshPayload = {
      sub: user.id,
      tokenVersion: user.tokenVersion,
      type: 'refresh',
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
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

  static refreshSession = async (refreshToken: string): Promise<UserTokenResponse> => {
    const { valid, expired, decoded } = (await verifyJWT(refreshToken)) as JWTVerifyVariables

    if (!valid) {
      logger.error(`users - refreshSession = ${expired ? 'Token expired' : 'Invalid token'}`)
      throw new HTTPException(401, { message: expired ? 'Token expired' : 'Invalid token' })
    }

    if (decoded?.type !== 'refresh') {
      logger.error('users - refreshSession = Invalid token type')
      throw new HTTPException(401, { message: 'Invalid token type' })
    }

    const user = await UserRepository.findUniqueById(decoded.sub)

    if (!user) {
      logger.error('users - refreshSession = Unauthorized')
      throw new HTTPException(401, { message: 'Unauthorized' })
    }

    if (decoded.tokenVersion !== user.tokenVersion) {
      logger.error('users - refreshSession = Token revoked')
      throw new HTTPException(401, { message: 'Token revoked' })
    }

    await UserRepository.updateTokenVersion(user.id)

    const accessPayload = {
      sub: user.id,
      tokenVersion: user.tokenVersion + 1,
      type: 'access',
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    }

    const refreshPayload = {
      sub: user.id,
      tokenVersion: user.tokenVersion + 1,
      type: 'refresh',
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    }

    const newAccessToken = await signJWT(accessPayload)
    const newRefreshToken = await signJWT(refreshPayload)

    return {
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
      },
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }
  }

  static get = async (username: string): Promise<UserResponse> => {
    const user = await UserRepository.findFirstByUsername(username)

    if (!user) {
      logger.error('users - get = Username is not found')
      throw new HTTPException(404, {
        message: 'Username is not found',
      })
    }

    return user
  }

  static update = async (userId: string, request: UserUpdateRequest): Promise<UserResponse> => {
    const isUserExist = await UserRepository.count(userId)

    if (isUserExist !== 1) {
      logger.error('users - update = User is not found')
      throw new HTTPException(404, { message: 'User is not found' })
    }

    const payload: UserUpdateRequest = {}

    if (request.username) payload.username = request.username
    if (request.password) payload.password = request.password
    if (request.name) payload.name = request.name

    return await UserRepository.update(userId, payload)
  }

  static logout = async (userId: string) => {
    const user = await UserRepository.updateTokenVersion(userId)

    if (!user) {
      logger.error('users - logout = User is not found')
      throw new HTTPException(404, { message: 'User is not found' })
    }

    return
  }
}
