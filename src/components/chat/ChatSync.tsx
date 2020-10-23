import React from 'react';
import {useSyncMatrixRoom} from '../../matrix/Chat'

interface ChatSyncProps {
  room: string
}

const ChatSync: React.FC<ChatSyncProps> = ({room}) => {
  const syncMatrixRoom = useSyncMatrixRoom(room)
  syncMatrixRoom()
  return null
};

export default ChatSync;
