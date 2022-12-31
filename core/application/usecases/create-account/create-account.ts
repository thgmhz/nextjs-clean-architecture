import { Account, AccountModel } from '@/domain/entities/account/account'
import { HttpClient, HttpResponse } from '@/application/contracts/http-client'
import { UseCase } from '@/application/contracts/usecase'

export class CreateAccountUseCase implements UseCase {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<AccountModel>,
  ) {}

  async execute(params: AccountModel): Promise<HttpResponse> {
    const account = new Account(params).create()

    if (account.isLeft()) {
      return Promise.reject(account.value)
    }

    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: account.getValue(),
    })

    return httpResponse
  }
}
