import {
  Authentication,
  AuthenticationModel,
  AuthenticationParams,
} from '@/domain/usecases/authentication'

import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { HttpClient, HttpStatusCode } from '@/application/protocols/http-client'

export class RemoteAuthentication implements Authentication {
  private readonly url
  private readonly httpClient

  constructor(url: string, httpClient: HttpClient<AuthenticationModel>) {
    this.url = url
    this.httpClient = httpClient
  }

  async auth(params: AuthenticationParams): Promise<AuthenticationModel> {
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
