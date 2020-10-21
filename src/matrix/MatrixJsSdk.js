import Olm from 'olm'
import * as sdk from "matrix-js-sdk";
import { useSetRecoilState } from 'recoil'
import { postsState } from '../recoil/feed'
import {article} from '../recoil/test'
import {Plugins} from '@capacitor/core'

const {Storage} = Plugins

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
