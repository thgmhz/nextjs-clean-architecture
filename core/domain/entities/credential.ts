export namespace Credential {
  export type Model = {
    username: string
    password: string
  }

  export type Params = {
    username: string
    password?: string
    passwordConfirmation?: string
  }
}
