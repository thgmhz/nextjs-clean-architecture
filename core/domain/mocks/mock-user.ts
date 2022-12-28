import { faker } from '@faker-js/faker'
import { UserModel } from '@/domain/entities/user/user'

export const mockUserParams = ({
  firstName,
  lastName,
  image,
}: {
  firstName?: string
  lastName?: string
  image?: string
}): UserModel => ({
  firstName: firstName ?? faker.name.firstName(),
  lastName: lastName ?? faker.name.lastName(),
  gender: faker.name.gender(),
  image: image ?? faker.image.avatar(),
})
