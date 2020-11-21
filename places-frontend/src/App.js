import './App.css';
import React, {useState, useCallback} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import NewPlace from './places/pages/NewPlace';
import Users from './user/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import {AuthContext} from './shared/context/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const login = useCallback(()=>{
    setIsLoggedIn(true);
  },[]);

  const logout = useCallback(()=>{
    setIsLoggedIn(false);
  },[]);

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
      <div className="app">
        <Router>
          <MainNavigation/>
          <main>
            <Switch>
                <Route path="/" exact >
                  <Users/>
                </Route>
                <Route path="/:userId/places">
                  <UserPlaces/>
                </Route>
                <Route path="/places/new" exact>
                  <NewPlace/>
                </Route>
                <Route path="/places/:placeId">
                  <UpdatePlace/>
                </Route>
                <Route path="/auth">
                  <Auth/>
                </Route>
                <Redirect to="/"/>
            </Switch>
          </main>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
