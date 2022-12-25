import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http-client'
import { Authentication } from "@/domain/usecases/authentication"
import { UnexpectedError } from '@/domain/errors/unexpected-error'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<Authentication.Model>
  ) { }

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    const { username, password } = params

    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: {
        username,
        password,
      }
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = Authentication.Model
}