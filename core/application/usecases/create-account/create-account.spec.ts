import { InvalidPasswordError } from '@/domain/errors/invalid-password-error'
import { HttpClientSpy } from '@/application/mock/mock-http'
import { AccountModel } from '@/domain/entities/account/account'
import { CreateAccountUseCase } from './create-account'
import {
  mockAccountParams,
  removePasswordConfirmation,
} from '@/domain/mocks/mock-account'
import { InvalidNameError } from '@/domain/errors/invalid-name-error'

const makeSut = (url: string = 'http://fake-url.com') => {
  const httpClientSpy = new HttpClientSpy<AccountModel>()
  const sut = new CreateAccountUseCase(url, httpClientSpy)

  return { httpClientSpy, sut }
}

describe('Domain - Usecase - Create Account', () => {
  test('should call HttpClient with correct values and create account', async () => {
    const url = 'http://www.nasa.org.br'
    const { sut, httpClientSpy } = makeSut(url)
    const params = mockAccountParams({})
    await sut.execute(params)
    const newParams = removePasswordConfirmation(params)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toEqual(newParams)
  })

  test('should not create account with invalid user data', async () => {
    const url = 'http://www.nasa.org.br'
    const { sut } = makeSut(url)
    const params = mockAccountParams({
      firstName: 'a',
      lastName: 'a',
      image: 'img.gif',
    })
    const promise = sut.execute(params)

    await expect(promise).rejects.toThrow(new InvalidNameError())
  })

  test('should not create account with invalid password', async () => {
    const url = 'http://www.nasa.org.br'
    const { sut } = makeSut(url)
    const params = mockAccountParams({
      password: '123456',
      passwordConfirmation: '123456',
    })
    const promise = sut.execute(params)

    await expect(promise).rejects.toThrow(new InvalidPasswordError())
  })

  test('should not create account with invalid password confirmation', async () => {
    const url = 'http://www.nasa.org.br'
    const { sut } = makeSut(url)
    const params = mockAccountParams({
      password: '123456',
      passwordConfirmation: '12345678',
    })
    const promise = sut.execute(params)

    await expect(promise).rejects.toThrow(new InvalidPasswordError())
  })
})
