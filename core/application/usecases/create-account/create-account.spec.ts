import { HttpClientSpy } from '@/application/mock/mock-http'
import { HttpStatusCode } from '@/application/protocols/http-client'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { UserAlreadyExistsError } from '@/domain/errors/user-already-exists'
import { AccountParams } from '@/domain/entities/account/account'
import { CreateAccountUseCase } from './create-account'
import { mockAccountParams } from '@/domain/mocks/mock-account'

const makeSut = (url: string = 'http://fake-url.com') => {
  const httpClientSpy = new HttpClientSpy<AccountParams>()
  const sut = new CreateAccountUseCase(url, httpClientSpy)

  return { httpClientSpy, sut }
}

describe('Domain - Usecase - Add Account', () => {
  test('should call HttpClient with correct values', async () => {
    const url = 'http://www.nasa.org.br'
    const { sut, httpClientSpy } = makeSut(url)
    const params = mockAccountParams({
      password: 'mM9@ppyy',
      confirmPassword: 'mM9@ppyy',
    })
    await sut.execute(params)

    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
    expect(httpClientSpy.body.account).toEqual(params)
  })

  test('should throw UserAlreadyExists if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
      body: {},
    }
    const promise = sut.execute(
      mockAccountParams({
        password: 'mM9@ppyy',
        confirmPassword: 'mM9@ppyy',
      }),
    )
    await expect(promise).rejects.toThrow(new UserAlreadyExistsError())
  })

  test('should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
      body: {},
    }
    const promise = sut.execute(
      mockAccountParams({
        password: 'mM9@ppyy',
        confirmPassword: 'mM9@ppyy',
      }),
    )
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
      body: {},
    }
    const promise = sut.execute(
      mockAccountParams({
        password: 'mM9@ppyy',
        confirmPassword: 'mM9@ppyy',
      }),
    )
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
      body: {},
    }
    const promise = sut.execute(
      mockAccountParams({
        password: 'mM9@ppyy',
        confirmPassword: 'mM9@ppyy',
      }),
    )
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should return an AddAccountModel if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResponse = { accessToken: '123', name: 'Thiago' }
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResponse,
    }
    const account = await sut.execute(
      mockAccountParams({
        password: 'mM9@ppyy',
        confirmPassword: 'mM9@ppyy',
      }),
    )
    expect(account).toEqual(httpResponse)
  })
})
