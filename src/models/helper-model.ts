import { UserResponse } from './user-model'

export type ApplicationVariables = {
  user: UserResponse
}

export type JWTVerifyVariables = {
  valid: boolean
  expired: boolean
  decoded: {
    sub: string
    tokenVersion: number
    type: 'access' | 'refresh'
    exp: number
  }
}
