import axios from 'axios'
import {useSetRecoilState} from 'recoil'
import {loggedInState, loginErrorState} from '../recoil/auth'
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



// {
//   "type": "m.login.password",
//   "identifier": {
//     "type": "m.id.user",
//     "user": "<user_id or user localpart>"
//   },
//   "password": "<password>"
// }
