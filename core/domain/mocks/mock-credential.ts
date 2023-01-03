import { faker } from '@faker-js/faker'
import { CredentialsConfirmModel } from '@/domain/entities/credentials/credentials'

export type MockCredentialsProps = {
  password?: string | null
  passwordConfirmation?: string | null
}

const fakePassword = 'Mm!9kjhjk'

export const mockCredentialsParams = ({
  password,
  passwordConfirmation,
}: MockCredentialsProps): CredentialsConfirmModel => ({
  username: faker.internet.userName(),
  password: password ?? fakePassword,
  passwordConfirmation: passwordConfirmation ?? fakePassword,
})
