import axios from 'axios'
import {useSetRecoilState} from 'recoil'
import {postsState, syncState} from '../recoil/feed'
import {loggedInState} from '../recoil/auth'
import {FILTER_CONFIG, VALIDATE_STATUS, MATRIX_CREDS_STORAGE_KEY,
        CLIENT_API_PATH} from './Config'
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

const getFilterId = async (base_url: string, user_id: string, authHeader: any) => {
  const filter_res = await axios({
    method: 'post',
    url:`${base_url}/user/${user_id}/filter`,
    headers: authHeader,
    data: FILTER_CONFIG,
    validateStatus: VALIDATE_STATUS
  }).catch(err => err)
  return filter_res.data.filter_id
}

const syncForever = async(base_url: string, authHeader: any, filter_id: string,
                          setPosts: any, setSynced: any) => {
  var since: string = ''
  while(true){
    const res = await axios({
      method: 'get',
      url: `${base_url}/sync?filter=${filter_id}&set_presence=offline&timeout=10000` +  (since? `&since=${since}`: ''),
      headers: authHeader,
      validateStatus: VALIDATE_STATUS
    }).catch(err => err)
    if(res.data && res.data.rooms && res.data.rooms.join){
      const rooms = Object.keys(res.data.rooms.join)
      const room_events: Array<any> = rooms.map((room: string) => {
        var events = res.data.rooms.join[room]
        events.room_name = room
        return events
      })
      const updatePosts = async () => {
        const newPosts = room_events
          .filter(e=>e.timeline).flatMap(e=>{
                                           var events = e.timeline.events
                                           events.map((ev:any) => ev.room_name = e.room_name)
                                           return events
                                 })
          .filter(e=>e.content.msgtype==='m.chupacabra')
        newPosts && setPosts((posts: any) =>{
          var clone = new Map(posts)
          newPosts.map(p => clone.set(p.event_id, {
            chupacabra_source: p.sender,
            title: p.content.body,
            uri: p.content.uri,
            room_name: p.room_name
          }))
          return clone
        })
        setSynced(true)
      }
      updatePosts()
    }
    since = res.data.next_batch
  }
}

export const useSyncChupacabraPosts = () => {
  const letIn = useSetRecoilState(loggedInState)
  const setPosts = useSetRecoilState(postsState)
  const setSynced = useSetRecoilState(syncState)
  const syncPosts = async () =>  {
    const creds = await getCredsOrLogout(letIn)
    if(!creds){return}
    const base_url = `${creds.homeserver_url}${CLIENT_API_PATH}`
    const authHeader = {Authorization: `Bearer ${creds.access_token}`}
    const user_id = creds.user_id
    const filter_id = await getFilterId(base_url, user_id, authHeader)
    if(!filter_id){return}
    syncForever(base_url, authHeader, filter_id, setPosts, setSynced)
  }
  return syncPosts
}
