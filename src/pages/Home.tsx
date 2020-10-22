import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon} from '@ionic/react'
import React from 'react'
import {Helmet} from "react-helmet"
import PostList from '../components/feed/PostList'
import SyncLoader from '../components/feed/SyncLoader'
import './Home.css';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title> Feed | Chupacabra </title>
      </Helmet>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Feed <IonIcon className="feed-icon" size="large" src="/assets/icon/feed.svg" /></IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle>Feed <IonIcon className="feed-icon" size="large" src="/assets/icon/feed.svg" /></IonTitle>
            </IonToolbar>
          </IonHeader>
          <PostList />
          <SyncLoader />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
