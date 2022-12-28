import { RemoteAuthenticationUseCase } from '@/application/usecases/authentication/remote-authentication'
import React, { useState } from 'react'

type Props = {
  authentication: RemoteAuthenticationUseCase
}

export const LoginPresentation: React.FC<Props> = ({ authentication }) => {
  const [response, setResponse] = useState<unknown>()
  const [error, setError] = useState<unknown>()

  const makeRequest = async () => {
    try {
      const response = await authentication.execute({
        username: 'kminchelle',
        password: '0lelplR',
      })

      setResponse(response)
    } catch (error: unknown) {
      setError(error)
    }
  }

  return (
    <>
      <button onClick={() => makeRequest()}>Login</button>
      <br />
      <br />
      {JSON.stringify(response)}
      <br />
      <br />
      {error && `${error}`}
    </>
  )
}
