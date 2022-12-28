export class InvalidConfirmPasswordError extends Error {
  constructor() {
    super('Confirmação de senha inválida')
    this.name = 'InvalidConfirmPasswordError'
  }
}
