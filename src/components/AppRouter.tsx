import React from 'react';
import { useRecoilValue } from 'recoil'
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {loggedInState} from '../recoil/auth'
import Home from '../pages/Home';
import Post from '../pages/Post';
import Login from '../pages/Login';

const AppRouter: React.FC = () => {
  const wasLetIn = useRecoilValue(loggedInState)
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/feed" component={Home} exact={true} />
        <Route path="/posts/:postId" component={Post} />
        <Route path="/letmein" component={Login} />
      </IonRouterOutlet>
      {wasLetIn?  <Route path="/" render={() => <Redirect to="/feed"/>} /> :  <Route path="*" render={() => <Redirect to="/letmein"/>} />}
    </IonReactRouter>
  );
};

export default AppRouter;
