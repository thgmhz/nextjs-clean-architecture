import { Entity } from '@/domain/contracts/entity'
import { InvalidPasswordConfirmation } from '@/domain/errors/invalid-password-confirmation-error'
import { InvalidPasswordError } from '@/domain/errors/invalid-password-error'
import { Either, left, right } from '@/application/shared/either'

export type CredentialsConfirmModel = {
  username: string
  password: string
  passwordConfirmation: string
}

export type CredentialsModel = Omit<
  CredentialsConfirmModel,
  'passwordConfirmation'
>

type EitherProps = Either<InvalidPasswordError, CredentialsModel>

export class Credentials implements Entity {
  public create(params: CredentialsConfirmModel): EitherProps {
    if (!Credentials.validatePassword(params.password)) {
      return left(new InvalidPasswordError())
    }

    if (
      !Credentials.validatePasswordConfirmation(
        params.password,
        params.passwordConfirmation,
      )
    ) {
      return left(new InvalidPasswordConfirmation())
    }

    return right({
      username: params.username,
      password: params.password,
    })
  }

  private static validatePassword(password: string): boolean {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,10}$/
    const isValidPassword = regex.test(password)

    if (!isValidPassword) {
      return false
    }

    return true
  }

  private static validatePasswordConfirmation(
    password: string,
    passwordConfirmation: string,
  ): boolean {
    if (passwordConfirmation !== password) {
      return false
    }

    return true
  }
}
