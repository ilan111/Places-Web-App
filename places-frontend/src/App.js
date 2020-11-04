import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import NewPlace from './places/pages/NewPlace';
import Users from './user/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation';


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
              <Route path="/places/new" exact>
                <NewPlace/>
              </Route>
              <Redirect to="/"/>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
