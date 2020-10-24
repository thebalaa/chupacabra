import React from 'react';
import {IonText, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle} from '@ionic/react'
import {MessageType} from '../../recoil/chat'
import './MessageItem.css'

interface MessageItemProps {
  message: MessageType
}

const MessageItem: React.FC<MessageItemProps> = ({message}) => {
  const sender = message.sender
  const body = message.body
  return (
      <IonCard className="message-item">
        <IonCardHeader><IonCardSubtitle>{sender}:</IonCardSubtitle></IonCardHeader>
        <IonCardContent><IonText>{body}</IonText></IonCardContent>
      </IonCard>
  );
};

export default MessageItem;
