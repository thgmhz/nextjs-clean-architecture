import { InvalidNameError } from '@/domain/errors/invalid-name-error'
import { InvalidImageError } from '@/domain/errors/invalid-image-error'
import { left, right, Either } from '@/shared/either'
import { Entity } from '@/domain/contracts/entity'

export type UserModel = {
  firstName: string
  lastName: string
  gender: string
  image: string
}

type EitherProps = Either<InvalidNameError | InvalidImageError, UserModel>
export class User implements Entity {
  constructor(private readonly params: UserModel) {}

  public create(): EitherProps {
    if (!User.validateName(this.params.firstName, this.params.lastName)) {
      return left(new InvalidNameError())
    }

    if (!User.validateImage(this.params.image)) {
      return left(new InvalidImageError())
    }

    return right({
      ...this.params,
    })
  }

  private static validateName(firstName: string, lastName: string): boolean {
    if (!firstName || !lastName) {
      return false
    }

    if (firstName.trim().length < 3 || firstName.trim().length > 50) {
      return false
    }

    if (lastName.trim().length < 3 || lastName.trim().length > 50) {
      return false
    }

    return true
  }

  private static validateImage(image: string): boolean {
    const regex = /\.(png|jpg)$/i
    if (!regex.test(image)) {
      return false
    }

    return true
  }
}
