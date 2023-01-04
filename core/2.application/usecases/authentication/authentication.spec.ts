import { mockHttpRequest, HttpClientSpy } from '@/application/mock/mock-http'
import {
  mockAuthenticationParams,
  mockAuthenticationResponse,
} from '@/domain/mocks/mock-authentication'
import { AuthenticationUseCase } from './authentication'

const response = mockAuthenticationResponse()

const makeSut = () => {
  const httpClientSpy = new HttpClientSpy(response)
  const sut = new AuthenticationUseCase()
  return { httpClientSpy, sut }
}

describe('Domain - Usecase - Authentication', () => {
  test('should call HttpClient with correct values and make login', async () => {
    const { sut, httpClientSpy } = makeSut()
    const params = mockAuthenticationParams()
    const auth = sut.execute(params)
    const data = await httpClientSpy.request(mockHttpRequest(auth))
    expect(data).toEqual(response)
  })
})
