import { AuthenticationController } from '@/adapters/app/controllers/authentication/authentication-controller'
import React, { useState } from 'react'

type Props = {
  authentication: AuthenticationController
}

export const SignInPresentation: React.FC<Props> = ({ authentication }) => {
  const [response, setResponse] = useState<unknown>()
  const [error, setError] = useState<unknown>()

  const makeRequest = async () => {
    await authentication
      .request({
        username: 'kminchelle',
        password: 'Aa@9mmmmm',
      })
      .then(setResponse)
      .catch(setError)
  }

  return (
    <>
      <button onClick={() => makeRequest()}>SignIn</button>
      <br />
      <br />
      Response: {JSON.stringify(response)}
      <br />
      <br />
      Error: {JSON.stringify(error)}
    </>
  )
}
