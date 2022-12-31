import React from 'react'
import { CreateAccountController } from '@/interface/controllers/create-account/create-account-controller'
import { SignUpPresentation } from '@/presentation/pages/signup/signup'

const SignUp: React.FC = () => {
  return <SignUpPresentation createAccount={CreateAccountController.create()} />
}

export default SignUp
