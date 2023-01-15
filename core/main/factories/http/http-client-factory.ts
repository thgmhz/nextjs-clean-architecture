import { AxiosHttpClient } from '@/infra/http/axios-http-client'

export const makeHttpClient = (): AxiosHttpClient => new AxiosHttpClient()
