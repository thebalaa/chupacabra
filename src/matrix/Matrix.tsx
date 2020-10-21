import axios from 'axios'
import {useSetRecoilState} from 'recoil'
import {loggedInState, loginErrorState} from '../recoil/auth'
import {postsState} from '../recoil/feed'
import {Plugins} from '@capacitor/core'

const {Storage} = Plugins

const validateStatus = (status: number) => {
    return status < 500;
}

export const useLoginWithPassword = () => {
  const letIn = useSetRecoilState(loggedInState)
  const setLoginError = useSetRecoilState(loginErrorState)
  const loginWithPassword = async (homeserver: string, user_id: string, password: string) => {
    setLoginError('')
    const res = await axios({
      method: 'post',
      url: `${homeserver}/_matrix/client/r0/login`,
      data: {
        type: 'm.login.password',
        identifier: {
          type: 'm.id.user',
          user: user_id
        },
        password: password
      },
      validateStatus: validateStatus
    }).catch(err => err)
    if(res.data.error){
      setLoginError(res.data.error)
      return
    }
    if(res.data.access_token){
      await Storage.set({
        key:"chupacabra_mx_creds",
        value: JSON.stringify(res.data)
      })
      letIn(true)
    }
  }
  return loginWithPassword
}

export const useLoginWithCreds = () => {
  const letIn = useSetRecoilState(loggedInState)
  const loginWithCreds = async () => {
    const res = await Storage.get({key:'chupacabra_mx_creds'})
    const creds = JSON.parse(res.value!)
    if (creds){
      letIn(true)
    }
  }
  return loginWithCreds
}

export const useSyncChupacabraPosts = () => {
  const letIn = useSetRecoilState(loggedInState)
  const setPosts = useSetRecoilState(postsState)
  const syncPosts = async () =>  {
    const res = await Storage.get({key:'chupacabra_mx_creds'})
    const creds = JSON.parse(res.value!)
    if(!creds){ // log out if we've called this without credentials
      letIn(false)
      return
    }
    const base_url = `https://matrix.${creds.home_server}/_matrix/client/r0`
    const authHeader = {'Authorization': `Bearer ${creds.access_token}`}
    const filter_config = {
      room: {
        state: {
          limit: 0,
          not_types: ['*']
        },
        timeline: {
          limit: 100,
          types: [
            "m.room.message"
          ]
        },
        ephemeral: {
          limit: 0,
          not_types: ["*"]
        }
      },
      presence: {
        limit: 0,
        not_types: ["*"]
      },
      account_data: {
        limit: 0,
        not_types: ["*"]
      },
      event_format: "client",
      event_fields: [
        "type",
        "content",
        "sender"
      ]
    }
    const filter_res = await axios({
      method: 'post',
      url:`${base_url}/user/${creds.user_id}/filter`,
      headers: authHeader,
      data: filter_config,
      validateStatus: validateStatus
    }).catch(err => err)
    const filter_id = filter_res.data.filter_id
    const syncForever = async() => {
      var since: string = ''
      while(true){
        const res = await axios({
          method: 'get',
          url: `${base_url}/sync?filter=${filter_id}&full_state=false&set_presence=offline&timeout=10000` +  (since? `&since=${since}`: ''),
          headers: authHeader,
          validateStatus: validateStatus
        }).catch(err => err)
        if(res.data && res.data.rooms && res.data.rooms.join){
          const room_events: Array<any> = Object.values(res.data.rooms.join)
          const updatePosts = async () => {
            room_events.filter(e=>e.timeline).flatMap(e=>e.timeline.events).map(e => {
              if(e.content.msgtype === 'm.chupacabra'){
                setPosts(posts => {
                  var clone = new Map(posts);
                  // TODO: lockdown schema and use a uuid for events, or fetch the event id of the message
                  clone.set(Math.random().toString(36), {
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
    syncForever()
  }
  return syncPosts
}
