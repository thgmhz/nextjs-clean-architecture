import {
  Account,
  AccountParams,
  AccountModel,
} from '@/domain/entities/account/account'
import { HttpClient, HttpStatusCode } from '@/application/protocols/http-client'
import { UseCase } from '@/application/usecases/usecase'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { UserAlreadyExistsError } from '@/domain/errors/user-already-exists'

export class CreateAccountUseCase
  implements UseCase<AccountParams, AccountModel>
{
  private readonly url
  private readonly httpClient

  constructor(url: string, httpClient: HttpClient<AccountParams>) {
    this.url = url
    this.httpClient = httpClient
  }

  async execute(params: AccountParams): Promise<AccountModel> {
    const account = new Account(params).create()

    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: account,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.forbidden:
        throw new UserAlreadyExistsError()
      default:
        throw new UnexpectedError()
    }
  }
}
