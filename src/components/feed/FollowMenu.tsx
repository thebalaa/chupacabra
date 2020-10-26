import React from 'react';
import {IonList, IonItem, IonLabel, IonCheckbox} from '@ionic/react'
import {useRecoilValue} from 'recoil'
import {followedRoomsState, joinedRoomsState} from '../../recoil/rooms'
import {useSetFilter} from '../../matrix/Filter'

const FollowModal: React.FC = () => {
  const followed_rooms = useRecoilValue(followedRoomsState)
  const joinedRooms = useRecoilValue(joinedRoomsState)
  const setFollowedRooms = useSetFilter()
  const handleChange = (room_name: string, isChecked: boolean) => {
    const clone = new Set<string>(followed_rooms)
    isChecked? clone.add(room_name) : clone.delete(room_name)
    setFollowedRooms(clone)
  }
  return (
    <IonList>
      {joinedRooms.map(r =>
        <IonItem key={r}>
          <IonLabel>{r}</IonLabel>
          <IonCheckbox value={r} checked={followed_rooms.has(r)}
                       onIonChange={e => handleChange(r, e.detail.checked)} />
        </IonItem>)}
    </IonList>
  );
};

export default FollowModal;
