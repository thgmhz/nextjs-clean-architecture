import { AxiosHttpClientFactory } from '@/main/factories/http/axios-http-client-factory'
import { ApiUrlFactory } from '@/main/factories/http/api-url-factory'
import { RemoteAuthentication } from '@/application/usecases/authentication/remote-authentication'
import { Authentication } from '@/domain/usecases/authentication'

export const RemoteAuthenticationFactory = (): Authentication =>
  new RemoteAuthentication(
    ApiUrlFactory('auth/login'),
    AxiosHttpClientFactory(),
  )
