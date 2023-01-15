import { Database } from '@/application/protocols'
import { PrismaDatabaseClient } from '@/infra/database/prisma/client/prisma-db-client'

export const makeDatabaseClient = (model: Database.Model) =>
  new PrismaDatabaseClient(model)
