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
        {wasLetIn
          ?<>
            <Route path="/feed" component={Home} exact={true}/>
            <Route path="/posts/:postId" component={Post} exact={true}/>
            <Route path="/letmein" render={() => <Redirect to="/feed"/>} exact={true}/>
            <Route path="/" render={() => <Redirect to="/feed"/>} exact={true}/>
           </>
          :<>
            <Route path="/feed" render={() => <Redirect to="/letmein"/>} exact={true}/>
            <Route path="/posts/:postId" render={() => <Redirect to="/letmein"/>} exact={true}/>
            <Route path="/letmein" component={Login} exact={true}/>
            <Route path="/" render={() => <Redirect to="/letmein"/>} exact={true}/>
           </>
        }
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default AppRouter;
