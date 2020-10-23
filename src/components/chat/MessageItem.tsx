import React from 'react';
import {IonText, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle} from '@ionic/react'
import {MessageType} from '../../recoil/chat'

interface MessageItemProps {
  message: MessageType
}

const MessageItem: React.FC<MessageItemProps> = ({message}) => {
  const sender = message.sender
  const body = message.body
  return (
      <IonCard>
        <IonCardHeader><IonCardSubtitle>{sender}:</IonCardSubtitle></IonCardHeader>
        <IonCardContent><IonText>{body}</IonText></IonCardContent>
      </IonCard>
  );
};

export default MessageItem;
