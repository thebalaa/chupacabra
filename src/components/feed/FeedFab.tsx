import React from 'react'
import {IonFab, IonFabButton, IonIcon } from '@ionic/react'
import { chatbubble } from 'ionicons/icons'
import {createChupacabraEvent} from '../../matrix/MatrixJsSdk.js'

const FeedFab: React.FC = () => {
  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={createChupacabraEvent}>
            <IonIcon icon={chatbubble} />
          </IonFabButton>
    </IonFab>
  );
};

export default FeedFab
