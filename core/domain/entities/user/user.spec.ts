import { mockUserParams } from '@/domain/mocks/mock-user'
import { faker } from '@faker-js/faker'
import { User } from './user'

describe('Entity - User', () => {
  test('should not create user when firstName and lastName is empty', () => {
    const error = new User(
      mockUserParams({
        firstName: '',
        lastName: '',
      }),
    ).create().value as Error

    expect(error.name).toBe('InvalidNameError')
  })

  test('should not create user if firstName is less than 3 characters', () => {
    const error = new User(
      mockUserParams({
        firstName: 'ab',
      }),
    ).create().value as Error

    expect(error.name).toBe('InvalidNameError')
  })

  test('should not create user if firstName has more than 50 characters', () => {
    const error = new User(
      mockUserParams({
        firstName: faker.random.words(500),
      }),
    ).create().value as Error

    expect(error.name).toBe('InvalidNameError')
  })

  test('should not create user if lastName is less than 3 characters', () => {
    const error = new User(
      mockUserParams({
        lastName: 'ab',
      }),
    ).create().value as Error

    expect(error.name).toBe('InvalidNameError')
  })

  test('should not create user if lastName has more than 50 characters', () => {
    const error = new User(
      mockUserParams({
        lastName: faker.random.words(500),
      }),
    ).create().value as Error

    expect(error.name).toBe('InvalidNameError')
  })

  test('should create user only if image is jpg or png', () => {
    const errorGif = new User(
      mockUserParams({
        image: 'img.gif',
      }),
    ).create().value as Error

    const errorBmp = new User(
      mockUserParams({
        image: 'img.bmp',
      }),
    ).create().value as Error

    const errorSvg = new User(
      mockUserParams({
        image: 'img.svg',
      }),
    ).create().value as Error

    expect(errorGif.name).toBe('InvalidImageError')
    expect(errorBmp.name).toBe('InvalidImageError')
    expect(errorSvg.name).toBe('InvalidImageError')

    const withPng = mockUserParams({ image: 'img.png' })
    const withJpg = mockUserParams({ image: 'img.jpg' })

    const userPng = new User(withPng).create().value
    const userJpg = new User(withJpg).create().value

    expect(userPng).toEqual(withPng)
    expect(userJpg).toEqual(withJpg)
  })
})
