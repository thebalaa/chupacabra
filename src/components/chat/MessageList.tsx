import React from 'react';
import {IonList, IonItem} from '@ionic/react'
import {useRecoilState} from 'recoil'
import {chatModalState} from '../../recoil/chat'

interface MessageListProps {
  room: string
}

const MessageList: React.FC<MessageListProps> = ({room}) => {
  return (
    <IonList>
      <IonItem>test msg</IonItem>
    </IonList>
  );
};

export default MessageList;
