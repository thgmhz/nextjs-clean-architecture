import { AccountModel, AccountParams } from '@/domain/entities/account/account'
import { mockUserParams } from './mock-user'
import { mockCredentialsParams } from './mock-credential'
import { HttpResponse } from '@/application/contracts/http-client'

type Props = {
  firstName?: string
  lastName?: string
  image?: string
  gender?: string
  username?: string
  password?: string
  passwordConfirmation?: string
}

export const mockAccountParams = ({
  firstName,
  lastName,
  image,
  gender,
  password,
  passwordConfirmation,
}: Props): AccountParams => ({
  ...mockUserParams({
    firstName,
    lastName,
    gender,
    image,
  }),
  ...mockCredentialsParams({
    password,
    passwordConfirmation,
  }),
})

export const mockAccountResponse = (): HttpResponse<AccountModel> => ({
  statusCode: 200,
  body: {
    ...mockUserParams({}),
  },
})
