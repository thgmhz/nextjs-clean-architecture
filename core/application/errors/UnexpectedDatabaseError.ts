export class UnexpectedDatabaseError extends Error {
  constructor() {
    super()
    this.name = 'UnexpectedDatabaseError'
  }
}
