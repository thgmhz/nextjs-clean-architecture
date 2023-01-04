import { createMocks } from 'node-mocks-http'
import auth from './auth'

describe('teste', () => {
  test('auth', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        username: 'dog',
        password: 'xis',
      },
    })

    await auth(req, res)

    console.log(res._getData())

    expect(res._getStatusCode()).toBe(200)
  })
})
