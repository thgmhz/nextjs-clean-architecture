import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '@/application/contracts/http-client'

export const mockHttpRequest = (body: any): HttpRequest => ({
  url: 'http://www.mock.com/',
  method: 'post',
  body,
  headers: {
    someHeader: 'some header value',
  },
})

export class HttpClientSpy<T = any> implements HttpClient {
  url?: string
  method?: string
  body?: any
  headers?: any
  response: HttpResponse<T> = {
    statusCode: HttpStatusCode.ok,
  }

  constructor(response: HttpResponse<T>) {
    if (response) this.response = response
  }

  async request(params: HttpRequest): Promise<HttpResponse<T>> {
    this.url = params.url
    this.method = params.method
    this.headers = params.headers
    this.body = params.body
    return this.response
  }
}
