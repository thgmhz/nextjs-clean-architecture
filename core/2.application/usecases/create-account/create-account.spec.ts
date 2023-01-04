import { InvalidPasswordConfirmation } from '@/domain/errors/invalid-password-confirmation-error'
import { mockHttpRequest } from '@/application/mock/mock-http'
import { HttpClientSpy } from './../../mock/mock-http'
import { InvalidNameError } from '@/domain/errors/invalid-name-error'
import { InvalidPasswordError } from '@/domain/errors/invalid-password-error'
import { CreateAccountUseCase } from './create-account'
import {
  mockAccountParams,
  mockAccountResponse,
} from '@/domain/mocks/mock-account'

const response = mockAccountResponse()

const makeSut = () => {
  const httpClientSpy = new HttpClientSpy(response)
  const sut = new CreateAccountUseCase()
  return { httpClientSpy, sut }
}

describe('Domain - Usecase - Create Account', () => {
  test('should call HttpClient with correct values and create account', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params = mockAccountParams({})
    const account = sut.execute(params)
    const data = await httpClientSpy.request(mockHttpRequest(account))
    expect(data).toEqual(response)
  })

  test('should not create account with invalid user data', () => {
    const { sut } = makeSut()
    const params = mockAccountParams({
      firstName: 'a',
      lastName: 'a',
      image: 'img.gif',
    })
    const account = sut.execute(params)
    expect(account.value).toEqual(new InvalidNameError())
  })

  test('should not create account with invalid password', () => {
    const { sut } = makeSut()
    const params = mockAccountParams({
      password: '123456',
      passwordConfirmation: '123456',
    })
    const account = sut.execute(params)
    expect(account.value).toEqual(new InvalidPasswordError())
  })

  test('should not create account with invalid password confirmation', () => {
    const { sut } = makeSut()
    const params = mockAccountParams({
      password: 'Mm1@qwerty',
      passwordConfirmation: 'Mm1@qwert',
    })
    const account = sut.execute(params)
    expect(account.value).toEqual(new InvalidPasswordConfirmation())
  })
})
