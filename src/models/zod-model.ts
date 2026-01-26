import { ZodError } from 'zod'

export type ZodSafeParse = {
    success: Boolean,
    error: ZodError,
}
