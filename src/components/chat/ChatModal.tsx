import React from 'react';
import {IonModal, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonButton} from '@ionic/react'
import {useRecoilState} from 'recoil'
import {chatModalState} from '../../recoil/chat'
import MessageList from './MessageList'
import MessageComposer from './MessageComposer'

interface ChatModalProps {
  title: string,
  room: string
}

const ChatModal: React.FC<ChatModalProps> = ({title, room}) => {
  const [isOpen, setOpen] = useRecoilState(chatModalState)
  return (
    <IonModal isOpen={isOpen} onDidDismiss={()=>setOpen(false)}>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="end">
              <IonButton color='primary' fill='outline' onClick={()=>setOpen(false)}>Close</IonButton>
            </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <MessageList room={room} />
      </IonContent>
      <MessageComposer room={room} />
    </IonModal>
  );
};

export default ChatModal;
