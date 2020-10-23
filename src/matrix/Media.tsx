import axios from 'axios'
import {VALIDATE_STATUS, MATRIX_CREDS_STORAGE_KEY} from './Config'
import {Plugins} from '@capacitor/core'

const {Storage} = Plugins

export const loadMedia = async (uri: string) => {
  const res = await Storage.get({key: MATRIX_CREDS_STORAGE_KEY})
  const creds = JSON.parse(res.value!)
  if(!creds){return}
  const base_url = creds.base_url
  const media_url = base_url.replace('/client/r0', '/media/r0')
  const server_media = uri.substring(6)
  const content = await axios({
    method: 'get',
    url:`${media_url}/download/${server_media}`,
    validateStatus: VALIDATE_STATUS
  }).catch(err => err)
  console.log(JSON.stringify(content))
  return content
}
