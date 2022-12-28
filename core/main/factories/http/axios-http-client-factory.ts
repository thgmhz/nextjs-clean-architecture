import { AxiosHttpClient } from '@/infra/http/axios-http-client'

export const AxiosHttpClientFactory = (): AxiosHttpClient =>
  new AxiosHttpClient()
