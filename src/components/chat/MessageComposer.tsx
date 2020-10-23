import React, {useState} from 'react';
import {IonFooter, IonToolbar, IonButtons, IonButton, IonTextarea} from '@ionic/react'
import {useSendMessage} from '../../matrix/Chat'

interface MessageComposerProps {
  room: string
}

const MessageComposer: React.FC<MessageComposerProps> = ({room}) => {
  const [message, setMessage] = useState<string>()
  const sendMessage = useSendMessage(room)
  const handleClick = async () => {
    await sendMessage(message!).catch(err => console.log(JSON.stringify(err)))
    setMessage('')
  }
  return (
    <IonFooter>
      <IonToolbar>
        <IonButtons slot='end'>
          <IonButton disabled={!message} color='primary' fill='outline' onClick={handleClick}>Send</IonButton>
        </IonButtons>
        <IonTextarea value={message} onIonChange={e => setMessage(e.detail.value!)} placeholder="Send a message"></IonTextarea>
      </IonToolbar>
    </IonFooter>
  );
};

export default MessageComposer;
