import React from 'react';
import {IonFooter, IonToolbar, IonButtons, IonButton, IonTextarea} from '@ionic/react'

interface MessageComposerProps {
  room: string
}

const MessageComposer: React.FC<MessageComposerProps> = ({room}) => {
  return (
    <IonFooter>
      <IonToolbar>
        <IonButtons slot='end'>
          <IonButton color='primary' fill='outline'>Send</IonButton>
        </IonButtons>
        <IonTextarea placeholder="Send a message"></IonTextarea>
      </IonToolbar>
    </IonFooter>
  );
};

export default MessageComposer;
