import { Account, AccountModel } from '@/domain/entities/account/account'
import { HttpClient, HttpResponse } from '@/application/contracts/http-client'
import { UseCase } from '@/application/contracts/usecase'

export class CreateAccountUseCase implements UseCase {
  private readonly url
  private readonly httpClient

  constructor(url: string, httpClient: HttpClient<AccountModel>) {
    this.url = url
    this.httpClient = httpClient
  }

  async execute(params: AccountModel): Promise<HttpResponse> {
    const account = new Account().create(params)

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
