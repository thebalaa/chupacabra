import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon} from '@ionic/react'
import React from 'react'
import PostList from '../components/feed/PostList'
import FeedFab from '../components/feed/FeedFab'
import './Home.css';

const Home: React.FC = () => {
  return (
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
        <FeedFab />
      </IonContent>
    </IonPage>
  );
};

export default Home;
