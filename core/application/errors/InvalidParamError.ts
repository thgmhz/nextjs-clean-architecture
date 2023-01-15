export class InvalidParamError extends Error {
  constructor(message: any) {
    super()
    this.name = 'InvalidParamError'
    this.message = message
  }
}
