import axios from 'axios'
import { AxiosHttpClient } from '@/infra/http/axios-http-client'
import { mockHttpRequest } from './mocks/mock-http'
import { mockAxios } from './mocks/mock-axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return { sut, mockedAxios }
}

describe('Infra - AxiosHttpClient', () => {
  test('should call axios with correct values', async () => {
    const { sut, mockedAxios } = makeSut()
    const httpRequest = mockHttpRequest({ body: { some: 'value' } })
    await sut.request(httpRequest)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: httpRequest.url,
      method: httpRequest.method,
      data: httpRequest.body,
      headers: httpRequest.headers,
    })
  })

  test('should return correct response', async () => {
    const { sut, mockedAxios } = makeSut()
    const httpRequest = mockHttpRequest({ body: { some: 'value' } })
    const httpResponse = await sut.request(httpRequest)
    const axiosResponse = await mockedAxios.request.mock.results[0].value

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    })
  })
})
