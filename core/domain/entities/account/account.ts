import { Entity } from '@/domain/entities/entity'
import { UserModel, User } from '@/domain/entities/user/user'
import { InvalidPasswordError } from '@/domain/errors/invalid-password-error'
import { InvalidConfirmPasswordError } from '@/domain/errors/invalid-confirm-password-error'

export interface AccountModel extends UserModel {
  username: string
  password: string
}

type ConfirmPassword = {
  confirmPassword: string
}

export type AccountParams = AccountModel & ConfirmPassword

export class Account implements Entity<AccountModel> {
  public readonly account: AccountParams

  constructor(account: AccountParams) {
    this.account = account
  }

  public create(): Account {
    this.validatePassword(this.account.password, this.account.confirmPassword)

    const userData = new User(this.account).create()

    return new Account({ ...this.account, ...userData.user })
  }

  public validatePassword(password: string, confirmPassword: string): void {
    /*
      should contain at least one digit
      should contain at least one lower case
      should contain at least one upper case
      should contain at least 8 from the mentioned characters
    */
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,10}$/
    const isValidPassword = regex.test(password)

    if (!isValidPassword) {
      throw new InvalidPasswordError()
    }

    if (confirmPassword !== password) {
      throw new InvalidConfirmPasswordError()
    }
  }
}
