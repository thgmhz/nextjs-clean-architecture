import { AxiosHttpClientFactory } from '@/main/factories/http/axios-http-client-factory'
import { ApiUrlFactory } from '@/main/factories/http/api-url-factory'
import { RemoteAuthenticationUseCase } from '@/application/usecases/authentication/remote-authentication'

export const RemoteAuthenticationFactory = (): RemoteAuthenticationUseCase =>
  new RemoteAuthenticationUseCase(
    ApiUrlFactory('auth/login'),
    AxiosHttpClientFactory(),
  )
