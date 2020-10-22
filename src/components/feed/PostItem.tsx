import React from 'react'
import {useRecoilValue} from 'recoil'
import {postState, PostType} from '../../recoil/feed'
import {IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonCardContent} from '@ionic/react'
import './PostItem.css'

interface PostItemProps {
  postId: string
}

const PostItem: React.FC<PostItemProps> = ({postId}) => {
  const post:PostType = useRecoilValue(postState(postId))
  return (
    <IonCard>
        <IonCardHeader>
          <IonCardTitle>{post.title}</IonCardTitle>
          <IonCardSubtitle>{post.chupacabra_source}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent><IonButton size="large" fill="outline" slot="end" routerLink={`posts/${postId}`} routerDirection="forward" >View</IonButton></IonCardContent>
    </IonCard>
  )
}

export default PostItem
