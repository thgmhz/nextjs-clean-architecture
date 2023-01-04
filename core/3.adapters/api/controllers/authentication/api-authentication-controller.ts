import { CredentialsModel } from '@/domain/entities/credentials/credentials'

export class APIAuthenticationController {
  constructor(private readonly params: CredentialsModel) {}

  public async execute() {
    // consulta no banco
    // retorna sucesso ou erro
  }
}
