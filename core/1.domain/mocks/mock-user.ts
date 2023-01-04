import { faker } from '@faker-js/faker'
import { UserModel } from '@/domain/entities/user/user'

export const mockUserParams = ({
  firstName,
  lastName,
  gender,
  image,
}: {
  firstName?: string
  lastName?: string
  image?: string
  gender?: string
}): UserModel => ({
  firstName: firstName ?? faker.name.firstName(),
  lastName: lastName ?? faker.name.lastName(),
  gender: gender ?? faker.name.gender(),
  image: image ?? faker.image.avatar(),
})
