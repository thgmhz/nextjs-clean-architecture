import { HttpResponse } from '@/application/protocols/http-client'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new Error(), // to do: create UnauthorizedError
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new Error('Internal Server Error'),
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
})

export const created = (body: any): HttpResponse => ({
  statusCode: 201,
  body,
})
