import { HttpMethod, HttpResponse } from '@/application/contracts/http-client'
import { AxiosHttpClient } from '@/infra/http/axios-http-client'

type Params = {
  url: string
  method: HttpMethod
  headers?: unknown
}

export const makeHttpClientCurry =
  ({ url, method, headers }: Params) =>
  async (body: any): Promise<HttpResponse> => {
    const response = await new AxiosHttpClient()
      .request({
        url,
        method,
        headers,
        body,
      })
      .then((res) => res)

    return response
  }
