import { mockAccountParams } from '@/domain/mocks/mock-account'
import { Account } from './account'

describe('Entity - Account', () => {
  test('should not create account if User entity returns some error', () => {
    const error = new Account(
      mockAccountParams({
        firstName: 'a',
      }),
    ).create().value as Error

    expect(error.name).toBe('InvalidNameError')
  })

  test('should not create account if Credential entity returns some error', () => {
    const error = new Account(
      mockAccountParams({
        password: '123',
      }),
    ).create().value as Error

    expect(error.name).toBe('InvalidPasswordError')
  })

  test('should create account and return the account data without password confirmation param', () => {
    const params = mockAccountParams({})

    const account = new Account(params).create().value

    const newParams = Object.assign({}, params, {
      passwordConfirmation: undefined,
    })

    expect(account).toEqual(newParams)
  })
})
