import axios, { AxiosResponse } from 'axios'
import {
  HttpRequest,
  HttpResponse,
  HttpClient,
} from '@/application/contracts/http-client'

const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response)
    if (response.status !== 200) {
      return Promise.reject(response)
    }
    return response
  },
  (error) => Promise.reject(error),
)

export class AxiosHttpClient implements HttpClient {
  async request({
    url,
    method,
    body,
    headers,
  }: HttpRequest): Promise<HttpResponse> {
    const response = await axiosInstance
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
