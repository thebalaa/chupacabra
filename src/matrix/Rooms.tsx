import axios from 'axios'
import {VALIDATE_STATUS, MATRIX_CREDS_STORAGE_KEY,
        CLIENT_API_PATH} from './Config'
import {Plugins} from '@capacitor/core'

const {Storage} = Plugins

export const getJoinedRooms = async() => {
  const creds_string = await Storage.get({key: MATRIX_CREDS_STORAGE_KEY})
  const creds = JSON.parse(creds_string.value!)
  if(!creds){return new Array<string>()}
  const base_url = `${creds.homeserver_url}${CLIENT_API_PATH}`
  const authHeader = {Authorization: `Bearer ${creds.access_token}`}
  const result = await axios({
    method: 'get',
    url:`${base_url}/joined_rooms`,
    headers: authHeader,
    validateStatus: VALIDATE_STATUS
  }).catch(err => err)
  return (result.data && result.data.joined_rooms)
    ? result.data.joined_rooms
    : new Array<string>()
}
