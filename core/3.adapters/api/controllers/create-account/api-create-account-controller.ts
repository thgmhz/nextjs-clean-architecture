import { AccountParams } from '@/domain/entities/account/account'

export class APICreateAccountController {
  constructor(private readonly params: AccountParams) {}

  public async execute() {
    // consulta no banco
    // retorna sucesso ou erro
  }
}
