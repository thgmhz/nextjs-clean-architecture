export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Esse usuário já existe.')
    this.name = 'UserAlreadyExistsError'
  }
}
