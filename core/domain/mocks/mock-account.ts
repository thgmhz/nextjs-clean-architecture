import { mockUserParams } from './mock-user'
import { mockCredentialsParams, MockCredentialsProps } from './mock-credential'
import { AccountModel } from '../entities/account/account'

type MockAccountParams = {
  firstName?: string
  lastName?: string
  image?: string
}

type Props = MockAccountParams & MockCredentialsProps

export const mockAccountParams = ({
  firstName,
  lastName,
  image,
  password,
  passwordConfirmation,
}: Props): AccountModel => ({
  ...mockUserParams({
    firstName,
    lastName,
    image,
  }),
  ...mockCredentialsParams({
    password,
    passwordConfirmation,
  }),
})

export const removePasswordConfirmation = (params: Props) =>
  Object.assign(params, {
    passwordConfirmation: undefined,
  })
