import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import NewPlace from './places/pages/NewPlace';
import Users from './user/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import {AuthContext} from './shared/context/auth-context';
import {useAuth} from './shared/hooks/auth-hook';

function App() {
  const {token, login, logout, userId } = useAuth();
  let routes = true;

  if(token){
    routes = (
      <Switch>
        <Route path="/" exact >
          <Users/>
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces/>
        </Route>
        <Route path="/places/new" exact>
          <NewPlace/>
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace/>
        </Route>
        <Redirect to="/"/>
      </Switch>
    );
  }
  else{
    routes = (
      <Switch>
        <Route path="/" exact >
          <Users/>
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces/>
        </Route>
        <Route path="/auth">
          <Auth/>
        </Route>
        <Redirect to="/auth"/>
      </Switch>
    );
  }

  return (
    <AuthContext.Provider 
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId, 
        login: login, 
        logout: logout
      }}>
      <div className="app">
        <Router>
          <MainNavigation/>
          <main>
                {routes}
          </main>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
