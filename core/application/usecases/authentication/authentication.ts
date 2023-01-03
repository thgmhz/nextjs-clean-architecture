import { CredentialsModel } from '@/domain/entities/credentials/credentials'
import { UseCase } from '@/application/contracts/usecase'
import { PerformCallback } from '@/application/contracts/perform-callback'
import { HttpResponse } from '@/application/contracts/http-client'

export type AuthenticationResponse = Promise<HttpResponse<CredentialsModel>>

export class AuthenticationUseCase implements UseCase {
  #perform: PerformCallback<AuthenticationResponse>

  constructor(perform: PerformCallback<AuthenticationResponse>) {
    this.#perform = perform
  }

  async execute(params: CredentialsModel): AuthenticationResponse {
    return this.#perform(params)
  }
}
