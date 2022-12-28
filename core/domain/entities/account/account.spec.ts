import { InvalidConfirmPasswordError } from '@/domain/errors/invalid-confirm-password-error'
import { InvalidPasswordError } from '@/domain/errors/invalid-password-error'
import { mockAccountParams } from '@/domain/mocks/mock-account'
import { Account } from './account'

describe('Entity - Account', () => {
  test('should not create account when password is less than 8 characters', () => {
    const account = new Account(
      mockAccountParams({
        password: 'mM9@pp',
        confirmPassword: 'mM9@pp',
      }),
    )
    const error = () => account.create()
    expect(error).toThrow(new InvalidPasswordError())
  })

  test('should not create account when password is 8 characters but no uppercase letter', () => {
    const account = new Account(
      mockAccountParams({
        password: 'mm9@ppyy',
        confirmPassword: 'mm9@ppyy',
      }),
    )
    const error = () => account.create()
    expect(error).toThrow(new InvalidPasswordError())
  })

  test('should not create account when password is 8 characters but no lowercase letter', () => {
    const account = new Account(
      mockAccountParams({
        password: 'MM9@PPYY',
        confirmPassword: 'MM9@PPYY',
      }),
    )
    const error = () => account.create()
    expect(error).toThrow(new InvalidPasswordError())
  })

  test('should not create account when password is 8 characters but no special character', () => {
    const account = new Account(
      mockAccountParams({
        password: 'mM98ppyy',
        confirmPassword: 'mM98ppyy',
      }),
    )
    const error = () => account.create()
    expect(error).toThrow(new InvalidPasswordError())
  })

  test('should not create account when password is 8 characters but no numeric digit', () => {
    const account = new Account(
      mockAccountParams({
        password: 'mM!!ppyy',
        confirmPassword: 'mM!!ppyy',
      }),
    )
    const error = () => account.create()
    expect(error).toThrow(new InvalidPasswordError())
  })

  test('should not create account when confirmPassword is not equal to password ', () => {
    const account = new Account(
      mockAccountParams({
        password: 'mM9@ppyy',
        confirmPassword: 'mM9@ppy',
      }),
    )
    const error = () => account.create()
    expect(error).toThrow(new InvalidConfirmPasswordError())
  })

  test('should create account when password and confirmPassword is valid ', () => {
    const accountData = mockAccountParams({
      password: 'mM9@ppyy',
      confirmPassword: 'mM9@ppyy',
    })

    const { account } = new Account(accountData).create()

    expect(account).toEqual(accountData)
  })
})
