import React from 'react';
import {IonFab, IonFabButton, IonIcon } from '@ionic/react'
import { chatbubble } from 'ionicons/icons'

const ChatFab: React.FC = () => {
  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={chatbubble} />
          </IonFabButton>
    </IonFab>
  );
};

export default ChatFab;
