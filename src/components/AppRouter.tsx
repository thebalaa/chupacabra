import React, {useEffect} from 'react';
import { useRecoilState } from 'recoil'
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {loggedInState} from '../recoil/auth'
import Home from '../pages/Home';
import Post from '../pages/Post';
import Login from '../pages/Login';
import {checkLoggedIn} from '../matrix/MatrixJsSdk.js'


const AppRouter: React.FC = () => {
  const [wasLetIn, setLetIn] = useRecoilState(loggedInState)
  useEffect(() => {
    const loginIfCreds = async () => {
      const shouldLetIn = await checkLoggedIn()
      if(shouldLetIn){
        setLetIn(true)
      }
    }
    loginIfCreds()
  }, [setLetIn])
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/feed" component={wasLetIn? Home : Login} exact={true} />
        <Route path="/posts/:postId" component={wasLetIn? Post : Login} />
      </IonRouterOutlet>
      <Route path="/" render={() => <Redirect to='/feed'/>}/>
    </IonReactRouter>
  );
};

export default AppRouter;
