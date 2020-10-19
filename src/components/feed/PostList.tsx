import React from 'react'
import {useRecoilValue} from 'recoil'
import {postList} from '../../recoil/feed'
import {IonList} from '@ionic/react'
import PostItem from './PostItem'

const PostList: React.FC = () => {
  const posts = useRecoilValue(postList)
  return (
    <IonList>
      {posts.map(postId => <PostItem key={postId} postId={postId}/>)}
    </IonList>
  )
}

export default PostList
