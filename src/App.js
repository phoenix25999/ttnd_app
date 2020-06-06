import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

import Home from './Containers/Home/Home';
import Dashboard from './Containers/Dashboard/Dashboard';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/dashboard' component={Dashboard} />
        </Switch>
      </BrowserRouter>
        
    </div>
  );
}

export default App;
