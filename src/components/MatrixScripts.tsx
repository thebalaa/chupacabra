import React from 'react';
import { useRecoilValue } from 'recoil'
import {loggedInState} from '../recoil/auth'
import { useMatrixSync } from '../matrix/MatrixJsSdk'

const LoggedInMatrixScripts: React.FC = () => {
  useMatrixSync()
  console.log('RENDERED LOGGEDIN COMPONENT')
  return null
}

const MatrixScripts: React.FC = () => {
  const wasLetIn = useRecoilValue(loggedInState)
  return wasLetIn? <LoggedInMatrixScripts /> : null
}

export default MatrixScripts;
