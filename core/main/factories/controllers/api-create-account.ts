import { APICreateAccountController } from '@/adapters/controllers/create-account/api-create-account-controller'
import { makeCreateAccountUseCase } from '@/main/factories/usecases/create-account'

export const makeApiCreateAccountController = () => {
  const useCase = makeCreateAccountUseCase()
  return new APICreateAccountController(useCase)
}
