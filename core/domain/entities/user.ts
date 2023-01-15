export namespace User {
  export type Model = {
    id: number
    firstName: string
    lastName: string
    gender: string
    image: string
  }

  export type Params = Omit<Model, 'id'>
}
