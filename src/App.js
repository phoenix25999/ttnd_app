import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './Containers/Home/Home';
import Dashboard from './Containers/Dashboard/Dashboard';

import './App.css';
import Profile from './Containers/Dashboard/Profile/Profile';

function App() {
  return (
    <div className="App">
      
        <Switch>
          
          <Route path='/' component={Home} exact />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/profile' component={Profile} />
        </Switch>
        
      
        
    </div>
  );
}

export default App;
