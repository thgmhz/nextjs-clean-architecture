import { AccountModel } from "@/domain/entities/account"

export namespace Authentication {
  export type Params = {
    username: string
    password: string
  }

  export type Model = AccountModel
}

export interface Authentication {
  auth: (params: Authentication.Params) => Promise<Authentication.Model>
}
