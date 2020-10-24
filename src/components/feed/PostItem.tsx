import React from 'react'
import {useRecoilValue} from 'recoil'
import {postState, PostType} from '../../recoil/feed'
import {IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonText,
        IonCardContent, IonChip} from '@ionic/react'
import './PostItem.css'

const timeSince = (ts: number) => {
  var seconds = Math.floor((Date.now() - ts) / 1000)
  console.log(seconds)
  var interval = seconds / 31536000
  if (interval > 1) {
    return Math.floor(interval) + " years"
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months"
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days"
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours"
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + " minutes"
  }
  return Math.floor(seconds) + " seconds"
}

interface PostItemProps {
  postId: string
}

const PostItem: React.FC<PostItemProps> = ({postId}) => {
  const post:PostType = useRecoilValue(postState(postId))
  const posted_date = new Date(post.server_ts)
  return (
    <IonCard button routerLink={`posts/${postId}`} routerDirection="forward">
        <IonCardHeader>
          <IonCardSubtitle>{posted_date.toLocaleDateString()} - {timeSince(post.server_ts)} ago</IonCardSubtitle>
          <IonCardTitle>{post.title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonText>
            Shared by: <IonChip outline>{post.chupacabra_source}</IonChip> <br/>
            in: <IonChip outline>{post.room_name}</IonChip>
          </IonText>
        </IonCardContent>
    </IonCard>
  )
}

export default PostItem
