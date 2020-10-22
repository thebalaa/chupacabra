import axios from 'axios'
import {useSetRecoilState} from 'recoil'
import {postsState} from '../recoil/feed'
import {loggedInState} from '../recoil/auth'
import {FILTER_CONFIG, VALIDATE_STATUS} from './Config'
import {Plugins} from '@capacitor/core'

const {Storage} = Plugins

const getCredsOrLogout = async (letIn: (shouldLetIn: boolean) => void) => {
  const res = await Storage.get({key:'chupacabra_mx_creds'})
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
                          setPosts: any) => {
  var since: string = ''
  while(true){
    const res = await axios({
      method: 'get',
      url: `${base_url}/sync?filter=${filter_id}&set_presence=offline&timeout=10000` +  (since? `&since=${since}`: ''),
      headers: authHeader,
      validateStatus: VALIDATE_STATUS
    }).catch(err => err)
    if(res.data && res.data.rooms && res.data.rooms.join){
      const room_events: Array<any> = Object.values(res.data.rooms.join)
      const updatePosts = async () => {
        room_events.filter(e=>e.timeline).flatMap(e=>e.timeline.events).map(e => {
          if(e.content.msgtype === 'm.chupacabra'){
            setPosts((posts: any) => {
              var clone = new Map(posts);
              clone.set(e.event_id, {
                chupacabra_source: e.sender,
                remote_source: 'Dracula Test Source',
                title: e.content.title,
                html: e.content.body
              })
              return clone
            })
          }
          return true
        })
      }
      updatePosts()
    }
    since = res.data.next_batch
  }
}

export const useSyncChupacabraPosts = () => {
  const letIn = useSetRecoilState(loggedInState)
  const setPosts = useSetRecoilState(postsState)
  const syncPosts = async () =>  {
    const creds = await getCredsOrLogout(letIn)
    if(!creds){return}
    const base_url = `https://matrix.${creds.home_server}/_matrix/client/r0`
    const authHeader = {Authorization: `Bearer ${creds.access_token}`}
    const user_id = creds.user_id
    const filter_id = await getFilterId(base_url, user_id, authHeader)
    if(!filter_id){return}
    syncForever(base_url, authHeader, filter_id, setPosts)
  }
  return syncPosts
}