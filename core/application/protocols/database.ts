export namespace Database {
  export interface Client {
    create: (data: any) => Promise<any>
    findByFieldValue: (field: string, value: string) => Promise<any>
  }

  export type Model = 'account'
}
