import { HttpClientSpy } from '@/application/mock/mock-http'
import { HttpStatusCode } from '@/application/protocols/http-client'
import { AuthenticationModel } from '@/domain/entities/authentication'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { AuthenticationUseCase } from './authentication'

const makeSut = (url: string = 'http://fake-url.com') => {
  const httpClientSpy = new HttpClientSpy<AuthenticationModel>()
  const sut = new AuthenticationUseCase(url, httpClientSpy)

  return { httpClientSpy, sut }
}

const fakeAuthParams = { username: 'test', password: 'test123' }

describe('Domain - Usecase - Authentication', () => {
  test('should call HttpClient with correct values', async () => {
    const url = 'http://www.nasa.org'
    const { sut, httpClientSpy } = makeSut(url)
    await sut.execute(fakeAuthParams)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body).toEqual(fakeAuthParams)
  })

  test('should throw InvalidCredentialError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
      body: {},
    }
    const promise = sut.execute(fakeAuthParams)
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
      body: {},
    }
    const promise = sut.execute(fakeAuthParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
      body: {},
    }
    const promise = sut.execute(fakeAuthParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
      body: {},
    }
    const promise = sut.execute(fakeAuthParams)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should return an Authentication.Model if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResponse = { accessToken: '123', name: 'Thiago' }
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResponse,
    }
    const account = await sut.execute(fakeAuthParams)
    expect(account).toEqual(httpResponse)
  })
})
