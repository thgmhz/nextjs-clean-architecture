export namespace Authentication {
  export type Params = {
    username: string
    password: string
  }

  export type Model = {
    accessToken: string
    name: string
  }
}

export interface Authentication {
  auth: (params: Authentication.Params) => Promise<Authentication.Model>
}
