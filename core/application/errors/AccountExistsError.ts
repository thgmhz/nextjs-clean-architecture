export class AccountExistsError extends Error {
  constructor(username: string) {
    super()
    this.name = 'AccountExistsError'
    this.message = 'Usuário existente: ' + username
  }
}
