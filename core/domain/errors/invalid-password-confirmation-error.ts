export class InvalidPasswordConfirmation extends Error {
  constructor() {
    super('Confirmação de senha inválida')
    this.name = 'InvalidPasswordConfirmation'
  }
}
