import { Account } from '@/domain/entities'

export const mockAccountParams = (): Account.Params => ({
  firstName: 'some value',
  lastName: 'some value',
  gender: 'some value',
  image: 'some value',
  username: 'some value',
  password: 'some value',
  passwordConfirmation: 'some value',
})
