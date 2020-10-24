import React from 'react';
import {IonList} from '@ionic/react'
import MessageItem from './MessageItem'
import {useRecoilValue} from 'recoil'
import {roomMessagesSelector} from '../../recoil/chat'
import {usePostFromUrl} from '../../recoil/feed'

const MessageList: React.FC = () => {
  const post = usePostFromUrl()
  const messages = useRecoilValue(roomMessagesSelector(post.room_name))
  return (
    <IonList>
      {messages.map(msg => <MessageItem key={msg.id} message={msg}/>)}
    </IonList>
  );
};

export default MessageList;
