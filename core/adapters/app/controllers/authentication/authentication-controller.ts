import { makeApiUrl } from '@/adapters/app/factories/http/api-url-factory'
import { AuthenticationUseCase } from '@/application/usecases/authentication/authentication'
import { makeHttpClientCurry } from '@/adapters/app/factories/http/http-client-curry-factory'

export class AuthenticationController {
  public static create() {
    return new AuthenticationUseCase(
      makeHttpClientCurry({
        url: makeApiUrl('auth'),
        method: 'post',
      }),
    )
  }
}
