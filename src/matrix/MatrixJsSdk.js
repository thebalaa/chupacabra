import Olm from 'olm'
import * as sdk from "matrix-js-sdk";
import { useSetRecoilState } from 'recoil'
import { postsState } from '../recoil/feed'
import {article} from '../recoil/test'
import {Plugins} from '@capacitor/core'

const {Storage} = Plugins

//{"user_id":"@patrick:tincan.community","access_token":"","home_server":"tincan.community","device_id":"FFMBULMEGW"}

global.Olm = Olm
export const tryLogin = async (homeserver, username, password) => {
  window.client = sdk.createClient(homeserver)
  let loginres = await window.client.loginWithPassword(username, password, (err, res) => null).catch(err => {console.error(err);})
  if (loginres){
    const creds = {
      baseUrl: homeserver,
      userId: loginres.user_id,
      accessToken: loginres.access_token
    }
    await Storage.set({
      key:"chupacabra_mx_creds",
      value: JSON.stringify(creds)
    })
    return loginres
  }
  return false
}

//// TODO: Integrate with matrix-js-sdk store instead of doing this ourselves?
export const checkLoggedIn = async () => {
  const res = await Storage.get({key:'chupacabra_mx_creds'})
  const creds = JSON.parse(res.value)
  if (creds){
    window.client = sdk.createClient(creds)
   return true
  }
  return false
}

export const useMatrixSync = () => {
  const setPosts = useSetRecoilState(postsState)
  const useMatrixEvents = (event, room, toStartOfTimeline) => {
    if (event.getType() !== "m.room.message") {
      return; // only use messages
    }
    if (event.event.content.msgtype !== "m.chupacabra")
    {
      console.log('not a chupacabra')
      return
    }
    console.log(event.event.content.body);
    setPosts(posts => {
      var clone = new Map(posts);
      clone.set(event.event.event_id, {
        chupacabra_source: event.event.sender,
        remote_source: 'Dracula Test Source',
        title: event.event.content.title,
        html: event.event.content.body
      })
      return clone
    })
  }
  window.client.on("Room.timeline", useMatrixEvents)
  window.client.startClient({initialSyncLimit: 10})
}

export const createChupacabraEvent =  () => {
  const content = {
    "title": "Private Messaging",
    "body": article,
    "msgtype": "m.chupacabra"
  };
  window.client.sendEvent("!SbxXxOxJQhwmABKEUZ:tincan.community", "m.room.message", content, "", (err, res) => {
    console.log(err);
  }).catch(err => {console.error(err);});
}
