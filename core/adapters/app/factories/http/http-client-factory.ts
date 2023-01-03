import { AxiosHttpClient } from '@/infra/http/axios-http-client'

export const makeHttpClient = <T>(): AxiosHttpClient<T> =>
  new AxiosHttpClient<T>()
