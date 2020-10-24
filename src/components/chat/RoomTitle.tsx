import React from 'react'
import {IonTitle} from '@ionic/react'
import {usePostFromUrl} from '../../recoil/feed'

const RoomTitle: React.FC = () => {
  const post = usePostFromUrl()
  return (
    <IonTitle>{post.room_name}</IonTitle>
  )
}

export default RoomTitle
