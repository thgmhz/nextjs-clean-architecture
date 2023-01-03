import { CreateAccountUseCase } from '@/application/usecases/create-account/create-account'
import { makeApiUrl } from '@/adapters/app/factories/http/api-url-factory'
import { makeHttpClientCurry } from '@/adapters/app/factories/http/http-client-curry-factory'

export class CreateAccountController {
  public static create() {
    return new CreateAccountUseCase(
      makeHttpClientCurry({
        url: makeApiUrl('users/add'),
        method: 'post',
      }),
    )
  }
}
