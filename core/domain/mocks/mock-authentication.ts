import { faker } from '@faker-js/faker'
import { AuthenticationParams } from '@/domain/usecases/authentication/authentication'

export const mockAuthenticationParams = (): AuthenticationParams => ({
  username: faker.internet.userName(),
  password: faker.internet.password(),
})
