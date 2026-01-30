import { CookieOptions } from 'hono/utils/cookie'

export const cookieOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Lax' as const,
  path: '/',
  maxAge: 3600,
} as CookieOptions
