import { afterEach, beforeEach, describe, expect, it } from 'bun:test'
import app from '../src'
import { logger } from '../src/utils/logger'
import { UserTest } from './test-util'

describe('POST /users', () => {
  afterEach(async () => {
    await UserTest.delete()
  })

  it('should reject register with invalid input', async () => {
    const response = await app.request('/users', {
      method: 'POST',
      body: JSON.stringify({
        username: '',
        password: '',
        name: '',
      }),
    })

    const body = await response.json()
    logger.debug(body.message)

    expect(response.status).toBe(422)
  })

  it('should reject register existed user', async () => {
    await UserTest.create()

    const response = await app.request('/users', {
      method: 'POST',
      body: JSON.stringify({
        username: 'test',
        password: 'test1234',
        name: 'test',
      }),
    })

    const body = await response.json()
    logger.debug(body.message)

    expect(response.status).toBe(409)
    expect(body.message).toBe('Username already exists')
  })

  it('should register a new user', async () => {
    const response = await app.request('/users', {
      method: 'POST',
      body: JSON.stringify({
        username: 'test',
        password: 'test1234',
        name: 'test',
      }),
    })

    const body = await response.json()
    logger.debug(body.message)

    expect(response.status).toBe(201)
    expect(body.data).toBeDefined()
    expect(body.data.username).toBe('test')
    expect(body.data.name).toBe('test')
  })
})

describe('POST /login', () => {
  beforeEach(async () => {
    await UserTest.create()
  })

  afterEach(async () => {
    await UserTest.delete()
  })

  it('should be reject if username is wrong', async () => {
    const response = await app.request('/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username: 'dubiidooo',
        password: 'test1234',
      }),
    })

    const body = await response.json()
    logger.debug(body.message)

    expect(body.message).toBe('Username or Password is incorrect')
  })

  it('should be reject if password is wrong', async () => {
    const response = await app.request('/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username: 'test',
        password: 'wrongpassword',
      }),
    })

    const body = await response.json()
    logger.debug(body.message)

    expect(body.message).toBe('Username or Password is incorrect')
  })

  it('should be able to login and return accessToken & refreshToken', async () => {
    const response = await app.request('/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username: 'test',
        password: 'test1234',
      }),
    })

    const body = await response.json()
    logger.debug(body.message)

    expect(body.accessToken).toBeDefined()
    expect(body.accessToken).toBeDefined()
  })
})
