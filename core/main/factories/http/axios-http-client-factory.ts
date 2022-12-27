import { AxiosHttpClient } from '@/infra/http/axios-http-client'

export const makeAxiosHttpClient = (): AxiosHttpClient => new AxiosHttpClient()
