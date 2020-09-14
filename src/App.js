import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import Signup from './Containers/Signup/Signup';
import Recovery from './Containers/Recovery/Recovery';
import Dashboard from './Containers/Dashboard/Dashboard';
import Profile from './Containers/Dashboard/Profile/Profile';

import './App.css';

function App() {
  return (
    <div className="App">
      
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/recovery' component={Recovery} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/profile' component={Profile} />
        </Switch>
   
    </div>
  );
}

export default App;
