import { mockAccountParams } from '@/domain/mocks/mock-account'
import { Account, AccountCreatedModel } from './account'

describe('Entity - Account', () => {
  test('should not create account if User entity returns some error', () => {
    const error = new Account().create(
      mockAccountParams({
        firstName: 'a',
      }),
    ).value as Error

    expect(error.name).toBe('InvalidNameError')
  })

  test('should not create account if Credential entity returns some error', () => {
    const error = new Account().create(
      mockAccountParams({
        password: '123',
      }),
    ).value as Error

    expect(error.name).toBe('InvalidPasswordError')
  })

  test('should create account and return the account data without password confirmation param', () => {
    const params = mockAccountParams({})

    const account = new Account().create(params).value as AccountCreatedModel

    const newParams = Object.assign({}, params, {
      passwordConfirmation: undefined,
    })

    expect(account).toEqual(newParams)
  })
})
