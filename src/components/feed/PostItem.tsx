import React from 'react'
import {useRecoilValue} from 'recoil'
import {postState} from '../../recoil/feed'
import {IonCard, IonText} from '@ionic/react'
import SourceChip from '../SourceChip'
import './PostItem.css'

interface PostItemProps {
  postId: string
}

const PostItem: React.FC<PostItemProps> = ({postId}) => {
  const post = useRecoilValue(postState(postId))
  return (
    <IonCard button routerLink={`posts/${postId}`} routerDirection="forward">
        <IonText>{post.title}</IonText>
        <SourceChip chupacabra_source={post.chupacabra_source}/>
    </IonCard>
  )
}

export default PostItem
