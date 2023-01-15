import { Account } from '@/domain/entities'
import { UseCase, Database, Validation } from '@/application/protocols'
import { Either, left, right } from '@/application/monads/either'
import { AccountExistsError } from '@/application/errors/AccountExistsError'
import { UnexpectedDatabaseError } from '@/application/errors/UnexpectedDatabaseError'
import { InvalidParamError } from '@/application/errors/InvalidParamError'

export class CreateAccountUseCase
  implements UseCase<Account.Params, Account.Model>
{
  constructor(
    private readonly validation: Validation<Account.Params>,
    private readonly database: Database.Client,
  ) {}

  async handle(params: Account.Params): Promise<Either<Error, Account.Model>> {
    const validation = this.validation.validate(params)

    if (validation.isLeft()) {
      return left(new InvalidParamError('Parâmetros inválidos.'))
    }

    delete params.passwordConfirmation

    const accountExists = await this.database.findByFieldValue(
      'username',
      params.username,
    )

    if (accountExists.value) {
      return left(new AccountExistsError(params.username))
    }

    if (accountExists.isLeft()) {
      return left(new UnexpectedDatabaseError())
    }

    const account = await this.database.create(params)

    if (account.isLeft()) {
      return left(new UnexpectedDatabaseError())
    }

    delete account.value.password

    return right(account.value)
  }
}
