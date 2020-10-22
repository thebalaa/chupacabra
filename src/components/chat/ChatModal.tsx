import React from 'react';
import {IonModal, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonButton} from '@ionic/react'
import {useRecoilState} from 'recoil'
import {chatModalState} from '../../recoil/chat'

const ChatModal: React.FC = () => {
  const [isOpen, setOpen] = useRecoilState(chatModalState)
  return (
    <IonModal isOpen={isOpen} onDidDismiss={()=>setOpen(false)}>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="end">
              <IonButton color='primary' fill='outline' onClick={()=>setOpen(false)}>Close</IonButton>
            </IonButtons>
          <IonTitle>Modal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>Content Goes Here</IonContent>
    </IonModal>
  );
};

export default ChatModal;
