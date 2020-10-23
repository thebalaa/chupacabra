import React from 'react'
import {useRecoilValue} from 'recoil'
import {usePostFromUrl} from '../../recoil/feed'
import {postMediaSelector} from '../../recoil/media'

const MatrixMedia: React.FC = () => {
  const post = usePostFromUrl()
  const content = useRecoilValue(postMediaSelector(post.uri))
  return (
    <>
    {content && <div dangerouslySetInnerHTML={{__html: content}}/>}
    </>
  )
}

export default MatrixMedia;
