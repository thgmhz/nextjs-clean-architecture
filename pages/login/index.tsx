import React from 'react'
import { RemoteAuthenticationFactory } from '@/main/factories/usecases/remote-authentication-factory'
import { LoginPresentation } from '@/presentation/pages/login/login'

const LoginPage: React.FC = () => {
  return <LoginPresentation authentication={RemoteAuthenticationFactory()} />
}

export default LoginPage
