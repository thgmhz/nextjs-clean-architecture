import { faker } from '@faker-js/faker'
import { AuthenticationModel } from '@/domain/entities/authentication'
import { AuthenticationParams } from '@/domain/usecases/authentication/authentication'
import { mockAccountModel } from './mock-account'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  username: faker.internet.userName(),
  password: faker.internet.password(),
})

export const mockAuthenticationModel = (): AuthenticationModel =>
  mockAccountModel()
