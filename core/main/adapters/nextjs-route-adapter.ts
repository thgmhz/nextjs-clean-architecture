import type { NextApiRequest, NextApiResponse } from 'next'
import { Controller } from '@/application/protocols/controller'

export const routeAdapter = (controller: Controller) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const httpResponse = await controller.handle(req.body)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    }

    return res.status(httpResponse.statusCode).json({
      error: httpResponse.body,
    })
  }
}
