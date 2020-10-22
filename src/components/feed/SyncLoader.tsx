import React from 'react'
import {useRecoilValue} from 'recoil'
import {syncState} from '../../recoil/feed'
import {IonLoading} from '@ionic/react'

const SyncLoader: React.FC = () => {
  const isSynced = useRecoilValue(syncState)
  return (
    <>
      <IonLoading message="Syncing Feed..." isOpen={!isSynced}/>
    </>
  )
}

export default SyncLoader
