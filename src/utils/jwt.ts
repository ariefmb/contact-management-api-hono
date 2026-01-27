import { sign, verify } from 'hono/jwt'

// Use a symmetric secret for HS256 to avoid RSA key requirements
const secret = Bun.env.JWT_PRIVATE_KEY
const publicKey = Bun.env.JWT_PUBLIC_KEY

export const signJWT = async (payload: Record<string, unknown>): Promise<string> => {
  console.log('secret', secret)
  return await sign(payload, secret!, 'HS256')
}

export const verifyJWT = async (token: string): Promise<Record<string, unknown> | null> => {
  try {
    console.log('publicKey', publicKey)
    const decoded = verify(token, publicKey!, 'RS256')
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
