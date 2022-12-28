import React, { useState } from 'react'
import { Authentication } from '@/domain/usecases/authentication'

type Props = {
  authentication: Authentication
}

export const LoginPresentation: React.FC<Props> = ({ authentication }) => {
  const [response, setResponse] = useState<unknown>()
  const [error, setError] = useState<unknown>()

  const makeRequest = async () => {
    try {
      const response = await authentication.auth({
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
