import {
  mockAuthenticationParams,
  mockAuthenticationResponse,
} from '@/domain/mocks/mock-authentication'
import { mockHttpClientCurry } from '@/application/mock/mock-http'
import { AuthenticationUseCase } from './authentication'

const response = mockAuthenticationResponse()

const makeSut = (url: string = 'http://fake-url.com') => {
  const httpClientSpy = mockHttpClientCurry({ url, method: 'post', response })
  const sut = new AuthenticationUseCase(httpClientSpy)
  return { httpClientSpy, sut }
}

describe('Domain - Usecase - Authentication', () => {
  test('should call HttpClient with correct values and make login', async () => {
    const { sut } = makeSut()
    const params = mockAuthenticationParams()
    const data = await sut.execute(params)
    expect(data).toEqual(response)
  })
})
