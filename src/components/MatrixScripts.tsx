import React from 'react';
import { useRecoilValue } from 'recoil'
import {loggedInState} from '../recoil/auth'
import {useLoginWithCreds} from '../matrix/Auth'
import {useSyncMatrix} from '../matrix/Sync'

const LoggedInMatrixScripts: React.FC = () => {
  const syncMatrix = useSyncMatrix()
  console.log('RENDERED LOGGEDIN COMPONENT')
  syncMatrix()
  return null
}

const MatrixScripts: React.FC = () => {
  const wasLetIn = useRecoilValue(loggedInState)
  const loginWithCreds = useLoginWithCreds()
  loginWithCreds()
  return wasLetIn? <LoggedInMatrixScripts /> : null
}

export default MatrixScripts;
