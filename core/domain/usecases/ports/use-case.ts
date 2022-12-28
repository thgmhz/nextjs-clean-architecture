export interface UseCase<T, P> {
  execute: (params: T) => Promise<P>
}
