import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import NewPlace from './places/pages/NewPlace';
import Users from './user/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';


function App() {
  return (
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
              <Redirect to="/"/>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
