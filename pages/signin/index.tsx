import React from 'react'
import { AuthenticationController } from '@/adapters/app/controllers/authentication/authentication-controller'
import { SignInPresentation } from '@/presentation/pages/signin/signin'

const SignIn: React.FC = () => {
  return <SignInPresentation authentication={new AuthenticationController()} />
}

export default SignIn
