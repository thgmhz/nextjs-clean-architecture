import { CredentialsModel } from '@/domain/entities/credentials/credentials'
import { UseCase } from '@/application/contracts/usecase'
import { HttpClient } from '@/application/contracts/http-client'
import { UserModel } from '@/domain/entities/user/user'

export class AuthenticationUseCase implements UseCase {
  private readonly url
  private readonly httpClient

  constructor(url: string, httpClient: HttpClient<UserModel>) {
    this.url = url
    this.httpClient = httpClient
  }

  async execute(params: CredentialsModel): Promise<UserModel> {
    const { username, password } = params

    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: {
        username,
        password,
      },
    })

    return httpResponse.body
  }
}
