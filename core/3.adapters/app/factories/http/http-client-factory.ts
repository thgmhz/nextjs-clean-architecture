import { AxiosHttpClient } from '@/5.infra/http/axios-http-client'

export const makeHttpClient = <T>(): AxiosHttpClient<T> =>
  new AxiosHttpClient<T>()
