import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/dashboard' component={Dashboard} />
      </Switch>
        
    </div>
  );
}

export default App;
