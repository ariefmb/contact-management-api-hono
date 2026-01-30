import { sign, verify } from 'hono/jwt'
import CONFIG from '../config/environment.js'

const secret = CONFIG.jwt_secret_key

export const signJWT = async (payload: Record<string, unknown>): Promise<string> => {
  return await sign(payload, secret!, 'HS256')
}

export const verifyJWT = async (token: string): Promise<Record<string, unknown> | null> => {
  try {
    const decoded = await verify(token, secret!, 'HS256')
    return {
      valid: true,
      expired: false,
      decoded,
    }
  } catch (error: any) {
    return {
      valid: false,
      expired: error.name === 'TokenExpiredError',
      decoded: null,
    }
  }
}
