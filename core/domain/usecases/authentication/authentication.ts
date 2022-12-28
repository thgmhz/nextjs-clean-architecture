import { AuthenticationModel } from '@/domain/entities/authentication'
import { UseCase } from '@/domain/usecases/ports/use-case'
import { HttpClient, HttpStatusCode } from '@/application/protocols/http-client'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'

type Params = {
  username: string
  password: string
}

type Model = AuthenticationModel

export class AuthenticationUseCase implements UseCase<Params, Model> {
  private readonly url
  private readonly httpClient

  constructor(url: string, httpClient: HttpClient<Model>) {
    this.url = url
    this.httpClient = httpClient
  }

  async execute(params: Params): Promise<Model> {
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
