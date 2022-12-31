import { AuthenticationUseCase } from '@/application/usecases/authentication/authentication'
import { makeAxiosHttpClient } from '@/interface/factories/http/axios-http-client-factory'
import { makeApiUrl } from '@/interface/factories/http/api-url-factory'

export class AuthenticationController {
  public static create(): AuthenticationUseCase {
    return new AuthenticationUseCase(
      makeApiUrl('users/add'),
      makeAxiosHttpClient(),
    )
  }
}
