import { CreateAccountUseCase } from '@/application/usecases/create-account/create-account'
import { makeApiUrl } from '@/adapters/app/factories/http/api-url-factory'
import { AccountParams } from '@/domain/entities/account/account'
import { makeHttpClient } from '@/adapters/app/factories/http/http-client-factory'

export class CreateAccountController {
  public async request(params: AccountParams) {
    const createAccount = new CreateAccountUseCase()
    const account = createAccount.execute(params)

    if (account.isLeft()) {
      return Promise.reject(account.value)
    }

    return makeHttpClient().request({
      url: makeApiUrl('users/add'),
      method: 'post',
      body: account,
    })
  }
}
