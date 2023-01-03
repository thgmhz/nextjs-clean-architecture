import React, { useState } from 'react'
import { CreateAccountUseCase } from '@/application/usecases/create-account/create-account'

type Props = {
  createAccount: CreateAccountUseCase
}

export const SignUpPresentation: React.FC<Props> = ({ createAccount }) => {
  const [response, setResponse] = useState<unknown>()
  const [error, setError] = useState<unknown>()

  const makeRequest = async () => {
    await createAccount
      .execute({
        firstName: 'aaaa',
        lastName: 'bbbb',
        gender: 'male',
        image: 'img.jpg',
        username: 'kminchelle',
        password: 'Aa@9mmmmm',
        passwordConfirmation: 'Aa@9mmmmm',
      })
      .then(setResponse)
      .catch(setError)
  }

  return (
    <>
      <button onClick={() => makeRequest()}>SignUp</button>
      <br />
      <br />
      {JSON.stringify(response)}
      <br />
      <br />
      {error && `${error}`}
    </>
  )
}
