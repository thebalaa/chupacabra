import { selectorFamily, selector, atom, useRecoilValue} from 'recoil'
import {useParams} from 'react-router-dom'

export type PostType = {
  chupacabra_source: string,
  title: string,
  uri: string,
  room_name: string,
  id: string
}

export const postsState = atom<Map<string, PostType>>({
  key: 'PostMap',
  default: new Map<string, PostType>()
})

export const postState = selectorFamily<PostType, string>({
  key: 'Post',
  get: (postId) => ({get}) => {
    const postsMap = get(postsState)
    const post: PostType = postsMap.get(postId) || {
      chupacabra_source: '',
      title: '',
      uri: '',
      room_name: '',
      id: ''
    }
    return post
  }
})

export const usePostFromUrl = () => {
  const {postId} = useParams()
  const post = useRecoilValue(postState(postId))
  return post
}

export const postList = selector<Array<string>>({
  key: "PostList",
  get: ({get}) => {
    const postMap = get(postsState)
    return Array.from(postMap.keys())
  }
})

export const syncState = atom<boolean>({
  key: "SyncState",
  default: false
})
