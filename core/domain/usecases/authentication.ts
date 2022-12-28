import { AccountModel } from '@/domain/entities/account'

export type AuthenticationParams = {
  username: string
  password: string
}

export type AuthenticationModel = AccountModel

export interface Authentication {
  auth: (params: AuthenticationParams) => Promise<AuthenticationModel>
}
