import { InvalidNameError } from '@/domain/errors/invalid-name-error'
import { InvalidImageError } from '@/domain/errors/invalid-image-error'
import { Entity } from '../entity'

export type UserModel = {
  firstName: string
  lastName: string
  gender: string
  image: string
}

export class User implements Entity<UserModel> {
  public readonly user: UserModel

  constructor(user: UserModel) {
    this.user = user
  }

  public create(): User {
    this.validateName(this.user.firstName, this.user.lastName)

    this.validateImage(this.user.image)

    return new User(this.user)
  }

  private validateName(firstName: string, lastName: string): void {
    if (!firstName || !lastName) {
      throw new InvalidNameError()
    }

    if (firstName.trim().length < 3 || firstName.trim().length > 50) {
      throw new InvalidNameError()
    }

    if (lastName.trim().length < 3 || lastName.trim().length > 50) {
      throw new InvalidNameError()
    }
  }

  private validateImage(image: string): void {
    const regex = /\.(png|jpg)$/i
    if (!regex.test(image)) {
      throw new InvalidImageError()
    }
  }
}
