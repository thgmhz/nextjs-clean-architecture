import { CredentialsModel } from '@/domain/entities/credentials/credentials'
import { UseCase } from '@/application/contracts/usecase'

export type AuthenticationParams = CredentialsModel

export class AuthenticationUseCase implements UseCase {
  execute(params: AuthenticationParams): AuthenticationParams {
    // To Do: implement business rules
    return params
  }
}
