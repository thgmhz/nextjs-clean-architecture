import { Either } from '../monads/either'

export interface UseCase<T, U> {
  handle: (params: T) => Promise<Either<Error, U>>
}
