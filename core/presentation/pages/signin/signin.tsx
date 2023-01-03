import { AuthenticationUseCase } from '@/application/usecases/authentication/authentication'
import React, { useState } from 'react'

type Props = {
  authentication: AuthenticationUseCase
}

export const SignInPresentation: React.FC<Props> = ({ authentication }) => {
  const [response, setResponse] = useState<unknown>()
  const [error, setError] = useState<unknown>()

  const makeRequest = async () => {
    console.log(authentication)
    await authentication
      .execute({
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
      {JSON.stringify(response)}
      <br />
      <br />
      {error && `${error}`}
    </>
  )
}
