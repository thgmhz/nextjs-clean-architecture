import { CreateAccountUseCase } from '@/application/usecases/create-account/create-account'
import { makeAxiosHttpClient } from '@/interface/factories/http/axios-http-client-factory'
import { makeApiUrl } from '@/interface/factories/http/api-url-factory'

export class CreateAccountController {
  public static create(): CreateAccountUseCase {
    return new CreateAccountUseCase(
      makeApiUrl('users/add'),
      makeAxiosHttpClient(),
    )
  }
}
