import { Account } from '@/domain/entities'
import { Controller, UseCase } from '@/application/protocols'
import {
  serverError,
  created,
  badRequest,
} from '@/adapters/controllers/helpers/http-helpers'
import { AccountExistsError, InvalidParamError } from '@/application/errors'

export class APICreateAccountController implements Controller {
  constructor(
    private readonly useCase: UseCase<Account.Params, Account.Model>,
  ) {}

  async handle(params: Account.Params) {
    const account = await this.useCase.handle(params)

    if (account.isRight()) return created(account.value)

    if (
      account.value instanceof InvalidParamError ||
      account.value instanceof AccountExistsError
    ) {
      return badRequest(account.value)
    }

    return serverError()
  }
}
