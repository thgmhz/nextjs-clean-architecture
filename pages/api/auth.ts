import type { NextApiRequest, NextApiResponse } from 'next'
import { APIAuthenticationController } from '@/adapters/api/controllers/authentication-controller'
import { CredentialsModel } from '@/domain/entities/credentials/credentials'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username, password } = req.query as CredentialsModel

  try {
    const auth = await new APIAuthenticationController({
      username,
      password,
    }).execute()

    res.status(200).json(auth)
  } catch (error) {
    res.status(400).send(error)
  }
}
