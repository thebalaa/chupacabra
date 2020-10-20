import Olm from 'olm'
import * as sdk from "matrix-js-sdk";

global.Olm = Olm
export const tryLogin = async (homeserver, username, password) => {
  window.client = sdk.createClient(homeserver)
  let loginres = await window.client.loginWithPassword(username, password, (err, res) => null).catch(err => {console.error(err);})
  if (loginres){
    return loginres
  }
  return false
}
