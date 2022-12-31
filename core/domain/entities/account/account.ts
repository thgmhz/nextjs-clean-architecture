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
  public create(params: AccountModel): EitherProps {
    const user = User.create({
      firstName: params.firstName,
      lastName: params.lastName,
      gender: params.gender,
      image: params.image,
    })

    if (user.isLeft()) {
      return left(user.value)
    }

    const credential = new Credentials().create({
      username: params.username,
      password: params.password,
      passwordConfirmation: params.passwordConfirmation,
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
