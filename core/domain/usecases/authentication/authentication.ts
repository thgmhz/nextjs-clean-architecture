import { AuthenticationModel } from '@/domain/entities/authentication'
import { UseCase } from '@/domain/usecases/ports/use-case'
import { HttpClient, HttpStatusCode } from '@/application/protocols/http-client'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'

export type AuthenticationParams = {
  username: string
  password: string
}

export class AuthenticationUseCase
  implements UseCase<AuthenticationParams, AuthenticationModel>
{
  private readonly url
  private readonly httpClient

  constructor(url: string, httpClient: HttpClient<AuthenticationModel>) {
    this.url = url
    this.httpClient = httpClient
  }

  async execute(params: AuthenticationParams): Promise<AuthenticationModel> {
    const { username, password } = params

    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: {
        username,
        password,
      },
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
