import z, { ZodType } from 'zod'

export class ContactValidation {
  static readonly ADD: ZodType = z.object({
    first_name: z.string().min(1).max(100),
    last_name: z.string().max(100).default('').optional(),
    email: z.email().max(100).default('').optional(),
    phone: z.string().max(100).default('').optional(),
  })

  static readonly UPDATE: ZodType = z.object({
    first_name: z.string().max(100).optional(),
    last_name: z.string().max(100).optional(),
    email: z.email().max(100).optional(),
    phone: z.string().max(100).optional(),
  })

  static readonly SEARCH: ZodType = z.object({
    name: z.string().max(100).optional(),
    email: z.email().max(100).optional(),
    phone: z.string().max(100).optional(),
    page: z.number().min(1).positive().default(1),
    size: z.number().min(1).positive().max(100).default(8),
  })
}
