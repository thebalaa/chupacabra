import React from 'react'
import {useRecoilValue} from 'recoil'
import {syncState} from '../../recoil/feed'
import {IonSpinner} from '@ionic/react'

const SyncLoader: React.FC = () => {
  const isSynced = useRecoilValue(syncState)
  return (
    <>
      {!isSynced && <IonSpinner />}
    </>
  )
}

export default SyncLoader
