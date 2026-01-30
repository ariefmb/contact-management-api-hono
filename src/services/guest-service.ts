import { HTTPException } from 'hono/http-exception'
import { UserRepository } from '../repositories/user-repository.js'
import { logger } from '../utils/logger.js'

export class GuestService {
  static getUserDefault = async (username: string) => {
    const user = await UserRepository.findFirstByUsername(username)

    if (!user) {
      logger.error('User data is not found')
      throw new HTTPException(404, { message: 'User data is not found' })
    }

    return user
  }
}
