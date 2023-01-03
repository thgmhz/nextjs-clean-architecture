import { PerformCallback } from '@/application/contracts/perform-callback'
import { UseCase } from '@/application/contracts/usecase'
import { HttpResponse } from '@/application/contracts/http-client'
import {
  Account,
  AccountModel,
  AccountParams,
} from '@/domain/entities/account/account'

export type AccountResponse = HttpResponse<AccountModel>

export class CreateAccountUseCase implements UseCase {
  #perform: PerformCallback<Promise<AccountResponse>>

  constructor(perform: PerformCallback<Promise<AccountResponse>>) {
    this.#perform = perform
  }

  async execute(params: AccountParams): Promise<AccountResponse> {
    const account = new Account(params).create()

    if (account.isLeft()) {
      return Promise.reject(account.value)
    }

    return this.#perform(account.value)
  }
}
