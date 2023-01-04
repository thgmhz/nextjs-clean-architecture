import { Either, left, right } from '@/application/shared/either'
import { UseCase } from '@/application/contracts/usecase'
import { HttpResponse } from '@/application/contracts/http-client'
import {
  Account,
  AccountModel,
  AccountParams,
} from '@/domain/entities/account/account'

export type AccountResponse = HttpResponse<AccountModel>

export class CreateAccountUseCase implements UseCase {
  execute(params: AccountParams): Either<Error, AccountModel> {
    const account = new Account(params).create()

    if (account.isLeft()) {
      return left(account.value)
    }

    return right(account.value)
  }
}
