import { InvalidNameError } from '@/domain/errors/invalid-name-error'
import { mockUserParams } from '@/domain/mocks/mock-user'
import { User } from './user'

describe('Entity - User', () => {
  test('should not create user with no firstName and lastName', () => {
    const user = new User(
      mockUserParams({
        firstName: '',
        lastName: '',
      }),
    )
    const error = () => user.create()
    expect(error).toThrow(new InvalidNameError())
  })

  test('should not create user if firstName is less than 3 characters', () => {
    const user = new User(
      mockUserParams({
        firstName: 'ab',
      }),
    )
    const error = () => user.create()
    expect(error).toThrow(new InvalidNameError())
  })

  test('should not create user if firstName has more than 3 characters', () => {
    const user = new User(
      mockUserParams({
        firstName: 'ab',
      }),
    )
    const error = () => user.create()
    expect(error).toThrow(new InvalidNameError())
  })
})
