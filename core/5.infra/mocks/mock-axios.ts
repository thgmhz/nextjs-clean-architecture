import axios from 'axios'

type MockedAxios = jest.Mocked<typeof axios>

export const mockAxiosResponse = () => ({
  data: 'fake data',
  status: 200,
})

export const mockAxios = (): MockedAxios => {
  const mock = axios as MockedAxios
  mock.request.mockClear().mockResolvedValue(mockAxiosResponse())
  return mock
}
