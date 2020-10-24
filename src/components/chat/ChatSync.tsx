import React from 'react';
import {useSyncMatrixRoom} from '../../matrix/Chat'
import {usePostFromUrl} from '../../recoil/feed'

const ChatSync: React.FC = () => {
  const post = usePostFromUrl()
  const syncMatrixRoom = useSyncMatrixRoom(post.room_name)
  post.room_name && syncMatrixRoom()
  return null
};

export default ChatSync;
