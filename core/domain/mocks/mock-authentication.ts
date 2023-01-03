import { CredentialsModel } from '@/domain/entities/credentials/credentials'
import { mockUserParams } from '@/domain/mocks/mock-user'
import { HttpResponse } from '@/application/contracts/http-client'
import { faker } from '@faker-js/faker'

export const mockAuthenticationParams = (): CredentialsModel => ({
  username: faker.internet.userName(),
  password: faker.internet.password(),
})

export const mockAuthenticationResponse = (): HttpResponse => ({
  statusCode: 200,
  body: {
    accessToken: 123,
    ...mockUserParams({}),
  },
})
