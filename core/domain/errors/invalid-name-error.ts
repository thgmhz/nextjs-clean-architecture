export class InvalidNameError extends Error {
  constructor() {
    super('Nome e sobrenome inválidos')
    this.name = 'InvalidNameError'
  }
}
