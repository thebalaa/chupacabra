import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import {Helmet} from "react-helmet"
import {useParams} from 'react-router-dom'
import ChatFab from '../components/chat/ChatFab'
import ChatModal from '../components/chat/ChatModal'
import ChatSync from '../components/chat/ChatSync'
import MatrixMedia from '../components/MatrixMedia'
import {useRecoilValue} from 'recoil'
import {postState} from '../recoil/feed'


const Post: React.FC = () => {
  const {postId} = useParams()
  const post = useRecoilValue(postState(postId))
  // TODO: Get room from post object once we actually have those getting passed in
  const discussionRoom = '!vfsMVjFkUDCPvcWDFK:tincan.community'
  return (
    <>
      <Helmet>
        <title> {post.title} | Chupacabra</title>
        <link rel="shortcut icon" type="image/png" href="/assets/icon/favicon.png" />
      </Helmet>
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
          <MatrixMedia uri={post.uri} />
          <ChatFab />
          <ChatModal title={post.title} room={discussionRoom} />
        </IonContent>
      </IonPage>
      <ChatSync room={discussionRoom}/>
    </>
  );
};

export default Post;
