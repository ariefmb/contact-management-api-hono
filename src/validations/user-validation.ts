import z, { ZodType } from 'zod'

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
    name: z.string().min(1).max(100),
    tokenVersion: z.number().optional().default(0),
  })

  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
  })

  static readonly REFRESH: ZodType = z.object({
    refreshToken: z.string().min(1),
  })

  static readonly UPDATE: ZodType = z.object({
    username: z.string().max(100).optional(),
    password: z.string().max(100).optional(),
    name: z.string().max(100).optional(),
  })
}
