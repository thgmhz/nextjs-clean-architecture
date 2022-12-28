import { faker } from '@faker-js/faker'
import { AccountParams } from '@/domain/entities/account/account'
import { mockUserParams } from './mock-user'

const mockedUserParams = mockUserParams({})

export const mockAccountParams = ({
  password,
  confirmPassword,
}: {
  password: string
  confirmPassword: string
}): AccountParams => ({
  ...mockedUserParams,
  username: faker.internet.userName(),
  password,
  confirmPassword,
})
