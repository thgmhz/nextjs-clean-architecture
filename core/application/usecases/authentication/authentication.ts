import { CredentialsModel } from '@/domain/entities/credentials/credentials'
import { UseCase } from '@/application/contracts/usecase'
import { PerformCallback } from '@/application/contracts/perform-callback'
import { HttpResponse } from '@/application/contracts/http-client'

export type AuthenticationResponse = HttpResponse<CredentialsModel>
export class AuthenticationUseCase implements UseCase {
  #perform: PerformCallback<Promise<HttpResponse<CredentialsModel>>>

  constructor(
    perform: PerformCallback<Promise<HttpResponse<CredentialsModel>>>,
  ) {
    this.#perform = perform
  }

  async execute(params: CredentialsModel): Promise<AuthenticationResponse> {
    return this.#perform(params)
  }
}
