export interface Entity<T> {
  create: () => Entity<T>
}
