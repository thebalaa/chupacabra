import { atom, atomFamily, selectorFamily} from 'recoil'
import {PostType} from './feed'

export type MessageType = {
  body: string,
  formatted_body: string,
  post_id: string,
  sender: string,
  id: string,
  server_ts: number
}

export const chatModalState = atom<boolean>({
  key: "ChatModalState",
  default: false
})

export const messagesState = atomFamily<Map<string, MessageType>, string>({
  key: 'MessageMap',
  default: roomId => new Map<string, MessageType>()
})

export const postMessagesSelector = selectorFamily<Array<MessageType>, PostType>({
  key: "MessageList",
  get: (post: PostType) => ({get}) => {
    const messageMap = get(messagesState(post.room_name))
    const messages = Array.from(messageMap.values()).filter((m: MessageType) =>
      m.post_id === post.id
    )
    messages.sort((a: MessageType, b: MessageType) => b.server_ts - a.server_ts)
    return messages
  }
})

export const roomSyncState = atomFamily<boolean, string>({
  key: 'lastSyncState',
  default: roomId => false
})
