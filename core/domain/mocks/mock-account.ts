import { faker } from '@faker-js/faker'
import { AccountModel } from '@/domain/entities/account'

export const mockAccountModel = (): AccountModel => ({
  id: faker.datatype.uuid(),
  token: faker.datatype.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  gender: faker.name.gender(),
  image: faker.image.people(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
})
