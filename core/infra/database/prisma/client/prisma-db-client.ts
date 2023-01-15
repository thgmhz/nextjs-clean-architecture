import { left, right } from '@/application/monads/either'
import { Database } from '@/application/protocols'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class PrismaDatabaseClient implements Database.Client {
  constructor(private readonly model: Database.Model) {}

  async create(data: any) {
    return await prisma[this.model].create({ data }).then(right).catch(left)
  }

  async findByFieldValue(field: string, value: string) {
    return await prisma[this.model]
      .findUnique({
        where: {
          [field]: value,
        },
      })
      .then(right)
      .catch(left)
  }
}
