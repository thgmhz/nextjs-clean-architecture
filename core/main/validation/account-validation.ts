import { z } from 'zod'
import { left, right } from '@/application/monads/either'
import { Validation } from '@/application/protocols/validation'
import { Account } from '@/domain/entities/account'

export class AccountValidation implements Validation<Account.Params> {
  public validate(params: Account.Params) {
    const validation = schema.safeParse(params)

    if (!validation.success) {
      return left(validation.error.issues)
    }

    return right(params)
  }
}

const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,10}$/

const schema = z
  .object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    gender: z.string(),
    image: z.string(),
    username: z.string().min(5),
    password: z.string().regex(passwordRegex),
    passwordConfirmation: z.string().regex(passwordRegex),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  })
