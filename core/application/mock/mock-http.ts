import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode
} from "@/application/protocols/http-client"

export class HttpClientSpy<T = any> implements HttpClient<T> {
  url?: string
  method?: string
  body?: any
  headers?: any
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok,
    body: {}
  }

  async request(params: HttpRequest): Promise<HttpResponse<T>> {
    this.url = params.url
    this.method = params.method
    this.body = params.body
    this.headers = params.headers
    return this.response
  }
}