import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { RemoteAuthentication } from '@/application/usecases/authentication/remote-authentication'
import { Authentication } from '@/domain/usecases/authentication'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

export const makeRemoteAuthentication = (): Authentication =>
  new RemoteAuthentication(makeApiUrl('/auth/login'), makeAxiosHttpClient())
