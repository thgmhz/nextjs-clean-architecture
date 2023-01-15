import { makeDatabaseClient } from '@/main/factories/database/database-client-factory'
import { CreateAccountUseCase } from '@/application/usecases/create-account/create-account'
import { AccountValidation } from '@/main/validation/account-validation'

export const makeCreateAccountUseCase = () =>
  new CreateAccountUseCase(
    new AccountValidation(),
    makeDatabaseClient('account'),
  )
