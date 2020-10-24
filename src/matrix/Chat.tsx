import axios from 'axios'
import {useSetRecoilState, useRecoilState} from 'recoil'
import {messagesState, roomSyncState} from '../recoil/chat'
import {loggedInState} from '../recoil/auth'
import {getRoomFilter, VALIDATE_STATUS, MATRIX_CREDS_STORAGE_KEY,
        CLIENT_API_PATH} from './Config'
import { v4 as uuidv4 } from 'uuid'
import {Plugins} from '@capacitor/core'

const {Storage} = Plugins

const getCredsOrLogout = async (letIn: (shouldLetIn: boolean) => void) => {
  const res = await Storage.get({key: MATRIX_CREDS_STORAGE_KEY})
  const creds = JSON.parse(res.value!)
  if(!creds){ // log out if we've called this without credentials
    letIn(false)
    return null
  }
  return creds
}

const getFilterId = async (base_url: string, user_id: string, authHeader: any, roomId: string) => {
  const filter_res = await axios({
    method: 'post',
    url:`${base_url}/user/${user_id}/filter`,
    headers: authHeader,
    data: getRoomFilter(roomId),
    validateStatus: VALIDATE_STATUS
  }).catch(err => err)
  return filter_res.data.filter_id
}

const syncForever = async(base_url: string, authHeader: any, filter_id: string,
                          setRoomMessages: any, roomId: string) => {
  var since = ''
  while(true){
    const res = await axios({
      method: 'get',
      url: `${base_url}/sync?filter=${filter_id}&set_presence=offline&timeout=10000` +  (since? `&since=${since}`: ''),
      headers: authHeader,
      validateStatus: VALIDATE_STATUS
    }).catch(err => err)
    if(res.data && res.data.rooms && res.data.rooms.join && res.data.rooms.join[roomId]){
      const room_events: any = res.data.rooms.join[roomId]
      const updateMessages = async () => {
        const newMessages = room_events.timeline.events
        newMessages && setRoomMessages((messages: any) =>{
          var clone = new Map(messages)
          newMessages.map((m: any) => clone.set(m.event_id, {
            sender: m.sender,
            id: m.event_id,
            body: m.content.body,
            server_ts: m.origin_server_ts
          }))
          return clone
        })
      }
      updateMessages()
    }
    since = res.data.next_batch
  }
}

export const useSyncMatrixRoom = (roomId: string) => {
  const letIn = useSetRecoilState(loggedInState)
  const setRoomMessages = useSetRecoilState(messagesState(roomId))
  const [isAlreadySyncing, setSyncing] = useRecoilState(roomSyncState(roomId))
  const syncMessages = async () =>  {
    const creds = await getCredsOrLogout(letIn)
    if(!creds){return}
    const base_url = `${creds.homeserver_url}${CLIENT_API_PATH}`
    const authHeader = {Authorization: `Bearer ${creds.access_token}`}
    const user_id = creds.user_id
    const filter_id = await getFilterId(base_url, user_id, authHeader, roomId)
    if(!filter_id){return}
    syncForever(base_url, authHeader, filter_id, setRoomMessages, roomId)
  }
  const res = isAlreadySyncing? () => null :  syncMessages
  setSyncing(true)
  return res
}

export const useSendMessage = (roomId: string) => {
  const letIn = useSetRecoilState(loggedInState)
  const sendMessage = async (message: string) => {
    const creds = await getCredsOrLogout(letIn)
    if(!creds){return}
    const base_url = `${creds.homeserver_url}${CLIENT_API_PATH}`
    const authHeader = {Authorization: `Bearer ${creds.access_token}`}
    const txnId = uuidv4()
    await axios({
      method: 'put',
      url:`${base_url}/rooms/${roomId}/send/m.room.message/${txnId}`,
      headers: authHeader,
      data: {msgtype: "m.text", body: message},
      validateStatus: VALIDATE_STATUS
    }).catch(err => console.log(err))
  }
  return sendMessage
}
