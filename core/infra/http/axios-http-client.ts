import axios from 'axios'
import {
  HttpRequest,
  HttpResponse,
  HttpClient,
} from '@/application/contracts/http-client'

export class AxiosHttpClient<T> implements HttpClient {
  async request({
    url,
    method,
    body,
    headers,
  }: HttpRequest): Promise<HttpResponse<T>> {
    const response = await axios.request({
      url,
      method,
      data: body,
      headers,
    })

    return {
      statusCode: response.status,
      body: response.data,
    }
  }
}
