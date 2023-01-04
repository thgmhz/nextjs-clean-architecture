import React, { useState } from 'react'
import { CreateAccountController } from '@/adapters/app/controllers/create-account/create-account-controller'

type Props = {
  createAccount: CreateAccountController
}

export const SignUpPresentation: React.FC<Props> = ({ createAccount }) => {
  const [response, setResponse] = useState<unknown>()
  const [error, setError] = useState<unknown>()

  const makeRequest = async () => {
    await createAccount
      .request({
        firstName: 'a',
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
      Response: {JSON.stringify(response)}
      <br />
      <br />
      Error: {error && `${error}`}
    </>
  )
}
