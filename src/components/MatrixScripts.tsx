import React from 'react';
import { useRecoilValue } from 'recoil'
import {loggedInState} from '../recoil/auth'
import {useLoginWithCreds, useSyncChupacabraPosts} from '../matrix/Matrix'

const LoggedInMatrixScripts: React.FC = () => {
  const syncPosts = useSyncChupacabraPosts()
  console.log('RENDERED LOGGEDIN COMPONENT')
  syncPosts()
  return null
}

const MatrixScripts: React.FC = () => {
  const wasLetIn = useRecoilValue(loggedInState)
  const loginWithCreds = useLoginWithCreds()
  loginWithCreds()
  return wasLetIn? <LoggedInMatrixScripts /> : null
}

export default MatrixScripts;
