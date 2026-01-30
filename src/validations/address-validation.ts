import z, { ZodType } from 'zod'

export class AddressValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1).max(100),
    street: z.string().max(100).optional(),
    city: z.string().max(100).optional(),
    province: z.string().max(100).optional(),
    country: z.string().min(1).max(100),
    postal_code: z.string().min(1).max(100),
  })

  static readonly UPDATE: ZodType = z.object({
    title: z.string().max(100).optional(),
    street: z.string().max(100).optional(),
    city: z.string().max(100).optional(),
    province: z.string().max(100).optional(),
    country: z.string().max(100).optional(),
    postal_code: z.string().max(100).optional(),
  })
}
