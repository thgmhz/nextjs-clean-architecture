import { Entity } from '@/domain/contracts/entity'
import { UserModel, User } from '@/domain/entities/user/user'
import { Either, left, right } from '@/shared/either'
import {
  Credentials,
  CredentialsConfirmModel,
} from '../credentials/credentials'

export type AccountModel = UserModel & CredentialsConfirmModel
export type AccountCreatedModel = Omit<AccountModel, 'passwordConfirmation'>

type EitherProps = Either<Error, AccountCreatedModel>

export class Account implements Entity {
  constructor(private readonly params: AccountModel) {}

  public create(): EitherProps {
    const user = new User({
      firstName: this.params.firstName,
      lastName: this.params.lastName,
      gender: this.params.gender,
      image: this.params.image,
    }).create()

    if (user.isLeft()) {
      return left(user.value)
    }

    const credential = new Credentials().create({
      username: this.params.username,
      password: this.params.password,
      passwordConfirmation: this.params.passwordConfirmation,
    })

    if (credential.isLeft()) {
      return left(credential.value)
    }

    return right({
      ...credential.value,
      ...user.value,
    })
  }
}
