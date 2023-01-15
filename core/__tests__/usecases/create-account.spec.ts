import { CreateAccountUseCase } from '@/application/usecases/create-account/create-account'
import { left, right } from '@/application/monads/either'
import { mockAccountParams, mockDatabaseClient, mockValidation } from './mocks'
import {
  AccountExistsError,
  InvalidParamError,
  UnexpectedDatabaseError,
} from '@/application/errors'

describe('Usecase - Create Account', () => {
  test('should return an "either" left when validation fails', async () => {
    const usecase = new CreateAccountUseCase(
      mockValidation(left),
      mockDatabaseClient,
    )
    const result = await usecase.handle(mockAccountParams())
    expect(result.isLeft()).toBeTruthy()
  })

  test('should return InvalidParamError when validation fails', async () => {
    const usecase = new CreateAccountUseCase(
      mockValidation(left, InvalidParamError),
      mockDatabaseClient,
    )
    const result = await usecase.handle(mockAccountParams())
    expect(result.value).toBeInstanceOf(InvalidParamError)
  })

  test('should return AccountExistsError when the checking if account exists return a thuthy value', async () => {
    const databaseClient = mockDatabaseClient
    databaseClient.findByFieldValue = jest.fn(() =>
      left({ someUser: 'someUser' }),
    )
    const usecase = new CreateAccountUseCase(
      mockValidation(right),
      databaseClient,
    )
    const result = await usecase.handle(mockAccountParams())
    expect(result.value).toBeTruthy()
    expect(result.value).toBeInstanceOf(AccountExistsError)
  })

  test('should return UnexpectedDatabaseError when checking if account exists returns an "either" left', async () => {
    const databaseClient = mockDatabaseClient
    databaseClient.findByFieldValue = jest.fn(() => left(null))
    const usecase = new CreateAccountUseCase(
      mockValidation(right),
      mockDatabaseClient,
    )
    const result = await usecase.handle(mockAccountParams())
    expect(result.value).toBeInstanceOf(UnexpectedDatabaseError)
  })

  test('should return UnexpectedDatabaseError when create account return an "either" left', async () => {
    const databaseClient = mockDatabaseClient
    databaseClient.create = jest.fn(() => left('some value'))
    const usecase = new CreateAccountUseCase(
      mockValidation(right),
      databaseClient,
    )
    const result = await usecase.handle(mockAccountParams())
    expect(result.value).toBeInstanceOf(UnexpectedDatabaseError)
  })

  test('should create an account and return user data without password and passwordConfirmation', async () => {
    const params = mockAccountParams()
    const databaseClient = mockDatabaseClient
    databaseClient.findByFieldValue = jest.fn(() => right(null))
    databaseClient.create = jest.fn(() => right(params))
    const usecase = new CreateAccountUseCase(
      mockValidation(right),
      databaseClient,
    )
    const result = await usecase.handle(params)
    delete params.password
    delete params.passwordConfirmation
    expect(result.value).toEqual(params)
  })
})
