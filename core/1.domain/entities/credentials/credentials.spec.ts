import { mockCredentialsParams } from '@/domain/mocks/mock-credential'
import { Credentials } from './credentials'

describe('Entity - Credentials', () => {
  test('should not create a Credential if the password is less than 8 characters', () => {
    const error = new Credentials().create(
      mockCredentialsParams({
        password: 'mM9@kop',
      }),
    ).value as Error

    expect(error.name).toBe('InvalidPasswordError')
  })

  test('should not create a Credential if the password has no uppercase letter', () => {
    const error = new Credentials().create(
      mockCredentialsParams({
        password: 'mm9@kopy',
      }),
    ).value as Error

    expect(error.name).toBe('InvalidPasswordError')
  })

  test('should not create a Credential if the password has no lowercase letter', () => {
    const error = new Credentials().create(
      mockCredentialsParams({
        password: 'MM9@KOPY',
      }),
    ).value as Error

    expect(error.name).toBe('InvalidPasswordError')
  })

  test('should not create a Credential if the password has no number digit', () => {
    const error = new Credentials().create(
      mockCredentialsParams({
        password: 'mMJ@kopy',
      }),
    ).value as Error

    expect(error.name).toBe('InvalidPasswordError')
  })

  test('should not create a Credential if the password has no special character', () => {
    const error = new Credentials().create(
      mockCredentialsParams({
        password: 'mM9Jkopy',
      }),
    ).value as Error

    expect(error.name).toBe('InvalidPasswordError')
  })

  test('should not create a Credential if the passwordConfirmation is not equal the password', () => {
    const error = new Credentials().create(
      mockCredentialsParams({
        password: 'mM9@kopy',
        passwordConfirmation: 'mM9@kopyy',
      }),
    ).value as Error

    expect(error.name).toBe('InvalidPasswordConfirmation')
  })

  test('should create a Credential if the passwordConfirmation and the password is valid', () => {
    const params = mockCredentialsParams({
      password: 'mM9@kopy',
      passwordConfirmation: 'mM9@kopy',
    })

    const account = new Credentials().create(params).value as Credentials

    const paramsWithoutPasswordConfirmation = Object.assign({}, params, {
      passwordConfirmation: undefined,
    })

    expect(account).toEqual(paramsWithoutPasswordConfirmation)
  })
})
