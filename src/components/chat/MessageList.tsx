import React from 'react';
import {IonList} from '@ionic/react'
import MessageItem from './MessageItem'

interface MessageListProps {
  room: string
}

const MessageList: React.FC<MessageListProps> = ({room}) => {
  // TODO: fetch messages for channel using recoil
  const messages = [{id: '1', sender: '@patrick:tincan.community', body: "how's it going?"}, {id: '2', sender: '@balaa:a.noteworthy.im', body: "great, you?"}, {id: '3', sender: '@patrick:tincan.community', body: "great"}]
  return (
    <IonList>
      {messages.map(msg => <MessageItem key={msg.id} message={msg}/>)}
    </IonList>
  );
};

export default MessageList;
