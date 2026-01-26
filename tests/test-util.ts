import prismaClient from '../src/utils/database'
import { hashing } from '../src/utils/hashing'

export class UserTest {
  static create = async () => {
    return await prismaClient.users.create({
      data: {
        id: Bun.randomUUIDv7(),
        username: 'test',
        password: hashing('test1234'),
        name: 'test',
      },
    })
  }

  static delete = async () => {
    return await prismaClient.users.deleteMany({
      where: {
        username: 'test',
      },
    })
  }
}
