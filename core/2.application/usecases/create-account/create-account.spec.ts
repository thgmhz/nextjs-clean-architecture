import { InvalidNameError } from '@/domain/errors/invalid-name-error'
import { InvalidPasswordError } from '@/domain/errors/invalid-password-error'
import { CreateAccountUseCase } from './create-account'
import {
  mockAccountParams,
  mockAccountResponse,
} from '@/domain/mocks/mock-account'
import { mockHttpClientCurry } from '@/application/mock/mock-http'

const response = mockAccountResponse()

const makeSut = (url: string = 'http://fake-url.com') => {
  const httpClientSpy = mockHttpClientCurry({
    url,
    method: 'post',
    response,
  })
  const sut = new CreateAccountUseCase(httpClientSpy)

  return { httpClientSpy, sut }
}

describe('Domain - Usecase - Create Account', () => {
  test('should call HttpClient with correct values and create account', async () => {
    const { sut } = makeSut()
    const params = mockAccountParams({})
    const data = await sut.execute(params)

    expect(data).toEqual(response)
  })

  test('should not create account with invalid user data', async () => {
    const { sut } = makeSut()
    const params = mockAccountParams({
      firstName: 'a',
      lastName: 'a',
      image: 'img.gif',
    })
    const promise = sut.execute(params)

    await expect(promise).rejects.toThrow(new InvalidNameError())
  })

  test('should not create account with invalid password', async () => {
    const { sut } = makeSut()
    const params = mockAccountParams({
      password: '123456',
      passwordConfirmation: '123456',
    })
    const promise = sut.execute(params)

    await expect(promise).rejects.toThrow(new InvalidPasswordError())
  })

  test('should not create account with invalid password confirmation', async () => {
    const { sut } = makeSut()
    const params = mockAccountParams({
      password: '123456',
      passwordConfirmation: '12345678',
    })
    const promise = sut.execute(params)

    await expect(promise).rejects.toThrow(new InvalidPasswordError())
  })
})
