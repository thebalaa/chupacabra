import React from 'react';
import {IonList} from '@ionic/react'
import MessageItem from './MessageItem'
import {useRecoilValue} from 'recoil'
import {roomMessagesSelector} from '../../recoil/chat'

interface MessageListProps {
  room: string
}

const MessageList: React.FC<MessageListProps> = ({room}) => {
  const messages = useRecoilValue(roomMessagesSelector(room))
  return (
    <IonList>
      {messages.map(msg => <MessageItem key={msg.id} message={msg}/>)}
    </IonList>
  );
};

export default MessageList;
