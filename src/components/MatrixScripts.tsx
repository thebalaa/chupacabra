import React from 'react';
import { useRecoilValue } from 'recoil'
import {loggedInState} from '../recoil/auth'
import {useLoginWithCreds} from '../matrix/Matrix'

const LoggedInMatrixScripts: React.FC = () => {
  //useMatrixSync()
  console.log('RENDERED LOGGEDIN COMPONENT')
  return null
}

const MatrixScripts: React.FC = () => {
  const wasLetIn = useRecoilValue(loggedInState)
  const loginWithCreds = useLoginWithCreds()
  loginWithCreds()
  return wasLetIn? <LoggedInMatrixScripts /> : null
}

export default MatrixScripts;
