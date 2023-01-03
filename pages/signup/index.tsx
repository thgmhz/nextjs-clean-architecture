import React from 'react'
import { CreateAccountController } from '@/adapters/app/controllers/create-account/create-account-controller'
import { SignUpPresentation } from '@/presentation/pages/signup/signup'

const SignUp: React.FC = () => {
  console.log(CreateAccountController.create())
  return <SignUpPresentation createAccount={CreateAccountController.create()} />
}

export default SignUp
