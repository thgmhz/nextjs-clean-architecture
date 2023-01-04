import { makeApiUrl } from '@/adapters/app/factories/http/api-url-factory'
import { makeHttpClient } from '@/adapters/app/factories/http/http-client-factory'
import {
  AuthenticationParams,
  AuthenticationUseCase,
} from '@/application/usecases/authentication/authentication'
export class AuthenticationController {
  public request(params: AuthenticationParams) {
    const authentication = new AuthenticationUseCase()
    const authenticationData = authentication.execute(params)

    return makeHttpClient().request({
      url: makeApiUrl('auth'),
      method: 'post',
      body: authenticationData,
    })
  }
}
