import { Credential, User } from './'

export namespace Account {
  export type Model = User.Model
  export type Params = User.Params & Credential.Params
}

export type WithId<T> = {
  id: number
} & T
