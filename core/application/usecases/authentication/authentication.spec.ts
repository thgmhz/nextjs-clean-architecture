import { HttpClientSpy } from '@/application/mock/mock-http'
import { AuthenticationUseCase } from './authentication'
import {
  mockCredentialsParams,
  removePasswordConfirmation,
} from '@/domain/mocks/mock-credential'
import { UserModel } from '@/domain/entities/user/user'

const makeSut = (url: string = 'http://fake-url.com') => {
  const httpClientSpy = new HttpClientSpy<UserModel>()
  const sut = new AuthenticationUseCase(url, httpClientSpy)

  return { httpClientSpy, sut }
}

describe('Domain - Usecase - Authentication', () => {
  test('should call HttpClient with correct values and make login', async () => {
    const url = 'http://www.nasa.org'
    const { sut, httpClientSpy } = makeSut(url)

    const params = mockCredentialsParams({})
    await sut.execute(params)

    const newParams = removePasswordConfirmation(params)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toEqual(newParams)
  })
})
