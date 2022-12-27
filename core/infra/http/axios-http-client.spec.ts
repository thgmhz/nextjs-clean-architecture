import axios from 'axios'
import { AxiosHttpClient } from './axios-http-client'
import { mockHttpRequest } from '@/application/mock/mock-http'
import { mockAxios } from '../mocks/mock-axios'

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
  it('should call axios with correct values', async () => {
    const { sut, mockedAxios } = makeSut()
    const httpRequest = mockHttpRequest()
    await sut.request(httpRequest)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: httpRequest.url,
      method: httpRequest.method,
      data: httpRequest.body,
      headers: httpRequest.headers,
    })
  })

  it('should return correct response', async () => {
    const { sut, mockedAxios } = makeSut()
    const httpRequest = mockHttpRequest()
    const httpResponse = await sut.request(httpRequest)
    const axiosResponse = await mockedAxios.request.mock.results[0].value

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    })
  })

  it('should return correct error', async () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.request.mockRejectedValueOnce({
      response: { error: 'some error' },
    })
    const promise = sut.request(mockHttpRequest())
    expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
  })
})
