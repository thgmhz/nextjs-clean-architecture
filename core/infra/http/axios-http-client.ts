import axios, { AxiosResponse } from 'axios'
import {
  HttpResponse,
  HttpClient,
  HttpRequest,
} from '@/application/protocols/http-client'

export class AxiosHttpClient implements HttpClient {
  async request({
    url,
    method,
    headers,
    body,
  }: HttpRequest): Promise<HttpResponse> {
    const response = await axios
      .request({
        url,
        method,
        data: body,
        headers,
      })
      .then((resp: AxiosResponse) => ({
        statusCode: resp.status,
        body: resp.data,
      }))
      .catch((error: any) => ({
        statusCode: error.response.status,
        body: error.response.data,
      }))

    if (response.statusCode !== 200) {
      return Promise.reject(response)
    }

    return response
  }
}
