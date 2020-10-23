import { atom, atomFamily, selectorFamily} from 'recoil'

export type MessageType = {
  body: string,
  sender: string,
  id: string
}

export const chatModalState = atom<boolean>({
  key: "ChatModalState",
  default: false
})

export const messagesState = atomFamily<Map<string, MessageType>, string>({
  key: 'MessageMap',
  default: roomId => new Map<string, MessageType>()
})

export const roomMessagesSelector = selectorFamily<Array<MessageType>, string>({
  key: "MessageList",
  get: roomId => ({get}) => {
    const messageMap = get(messagesState(roomId))
    return Array.from(messageMap.values())
  }
})

export const roomSyncState = atomFamily<boolean, string>({
  key: 'lastSyncState',
  default: roomId => false
})
