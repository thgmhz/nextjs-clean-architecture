import React from 'react'
import { CreateAccountController } from '@/adapters/app/controllers/create-account/create-account-controller'
import { SignUpPresentation } from '@/presentation/pages/signup/signup'

const SignUp: React.FC = () => {
  return <SignUpPresentation createAccount={new CreateAccountController()} />
}

export default SignUp
