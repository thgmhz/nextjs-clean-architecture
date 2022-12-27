import axios, { AxiosResponse } from 'axios'
import {
  HttpRequest,
  HttpResponse,
  HttpClient,
} from '@/application/protocols/http-client'

export class AxiosHttpClient implements HttpClient {
  async request({
    url,
    method,
    body,
    headers,
  }: HttpRequest): Promise<HttpResponse> {
    let response: AxiosResponse

    try {
      response = await axios.request({
        url,
        method,
        data: body,
        headers,
      })
    } catch (error: any) {
      response = error.response
    }

    return {
      statusCode: response.status,
      body: response.data,
    }
  }
}
