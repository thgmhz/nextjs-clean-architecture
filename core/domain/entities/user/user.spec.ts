import { mockUserParams } from '@/domain/mocks/mock-user'
import { faker } from '@faker-js/faker'
import { User } from './user'

describe('Entity - User', () => {
  test('should not create user when firstName and lastName is empty', () => {
    const error = User.create(
      mockUserParams({
        firstName: '',
        lastName: '',
      }),
    ).value as Error

    expect(error.name).toBe('InvalidNameError')
  })

  test('should not create user if firstName is less than 3 characters', () => {
    const error = User.create(
      mockUserParams({
        firstName: 'ab',
      }),
    ).value as Error

    expect(error.name).toBe('InvalidNameError')
  })

  test('should not create user if firstName has more than 50 characters', () => {
    const error = User.create(
      mockUserParams({
        firstName: faker.random.words(500),
      }),
    ).value as Error

    expect(error.name).toBe('InvalidNameError')
  })

  test('should not create user if lastName is less than 3 characters', () => {
    const error = User.create(
      mockUserParams({
        lastName: 'ab',
      }),
    ).value as Error

    expect(error.name).toBe('InvalidNameError')
  })

  test('should not create user if lastName has more than 50 characters', () => {
    const error = User.create(
      mockUserParams({
        lastName: faker.random.words(500),
      }),
    ).value as Error

    expect(error.name).toBe('InvalidNameError')
  })

  test('should create user only if image is jpg or png', () => {
    const errorGif = User.create(
      mockUserParams({
        image: 'img.gif',
      }),
    ).value as Error

    const errorBmp = User.create(
      mockUserParams({
        image: 'img.bmp',
      }),
    ).value as Error

    const errorSvg = User.create(
      mockUserParams({
        image: 'img.svg',
      }),
    ).value as Error

    expect(errorGif.name).toBe('InvalidImageError')
    expect(errorBmp.name).toBe('InvalidImageError')
    expect(errorSvg.name).toBe('InvalidImageError')

    const png = mockUserParams({ image: 'img.png' })
    const jpg = mockUserParams({ image: 'img.jpg' })

    const userPng = User.create(png).value as User
    const userJpg = User.create(jpg).value as User

    expect(userPng).toEqual(png)
    expect(userJpg).toEqual(jpg)
  })
})
