import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  HttpMethod,
} from '@/application/contracts/http-client'

export const mockHttpRequest = (): HttpRequest => ({
  url: 'http://www.mock.com/',
  method: 'post',
  body: {
    someBody: 'some body value',
  },
  headers: {
    someHeader: 'some header value',
  },
})

type Params = {
  url: string
  method: HttpMethod
  headers?: any
  response?: any
}

export const mockHttpClientCurry =
  ({ url, method, response }: Params) =>
  async (body: any): Promise<HttpResponse> => {
    const data = await new HttpClientSpy(response)
      .request({
        url,
        method,
        body,
      })
      .then((res) => res)
    return data
  }

export class HttpClientSpy<T = any> implements HttpClient<T> {
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
