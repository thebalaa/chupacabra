import React from 'react'
import {useRecoilValue} from 'recoil'
import {postState} from '../../recoil/feed'
import { IonCard, IonBadge, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonAvatar, IonButton} from '@ionic/react'

interface SocialCardProps {
  postId: string
}

const SocialCard: React.FC<SocialCardProps> = ({postId}) => {
  const post = useRecoilValue(postState(postId))
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>{post.remote_source}</IonCardSubtitle>
        <IonCardTitle>{post.chupacabra_source}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div className='external-content' dangerouslySetInnerHTML={{__html: post.html}}></div>
      </IonCardContent>
      <IonButton>Discuss</IonButton>
      <IonButton>Share</IonButton>
    </IonCard>
  )
}

export default SocialCard
