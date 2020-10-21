import { IonList, IonItem, IonInput, IonText, IonLabel, IonButton} from '@ionic/react';
import React, { useState, useLayoutEffect} from 'react';
import { useHistory } from "react-router-dom";
import {useSetRecoilState} from 'recoil'
import {loggedInState} from '../../recoil/auth'
import {tryLogin, checkLoggedIn} from '../../matrix/MatrixJsSdk.js'

const SignInPage: React.FC = () => {
  const [homeserver, setHomeserver] = useState<string>('https://');
  const [user, setUser] = useState<string>();
  const [password, setPassword] = useState<string>()
  const setLoggedIn = useSetRecoilState(loggedInState)
  const history = useHistory()
  const tryLoggingIn = async () => {
    const didSucceed = await tryLogin(homeserver, user, password)
    if(didSucceed){
      setLoggedIn(true)
      history.push('/feed')
    }
  }
  useLayoutEffect(() => {
    const loginIfCreds = async () => {
      const wasLetIn = await checkLoggedIn()
      if(wasLetIn){
        setLoggedIn(true)
      }
    }
    loginIfCreds()
  }, [setLoggedIn])
  return (
    <>
      <IonList lines="inset">
        <IonItem>
          <IonLabel position="stacked">Homeserver<IonText color="danger">*</IonText></IonLabel>
          <IonInput type="url" value={homeserver} placeholder="https://matrix.org" onIonChange={e => setHomeserver(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">User<IonText color="danger">*</IonText></IonLabel>
          <IonInput type="text" value={user} placeholder="username" onIonChange={e => setUser(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Password<IonText color="danger">*</IonText></IonLabel>
          <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
        </IonItem>
      </IonList>
      <IonButton expand="block" onClick={tryLoggingIn}>Sign In</IonButton>
    </>
  );
};

export default SignInPage
