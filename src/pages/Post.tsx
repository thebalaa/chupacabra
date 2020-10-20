import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import {useParams} from 'react-router-dom'
import ChatFab from '../components/chat/ChatFab'
import {useRecoilValue} from 'recoil'
import {postState} from '../recoil/feed'


const Post: React.FC = () => {
  const {postId} = useParams()
  const post = useRecoilValue(postState(postId))
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
          <IonTitle>{post.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>{post.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="exernal-content" dangerouslySetInnerHTML={{__html: post.html}}/>
        <ChatFab />
      </IonContent>
    </IonPage>
  );
};

export default Post;
