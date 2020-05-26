import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Dashboard from './Dashboard/Dashboard';
import Buzz from './Buzz';
import Complaints from './Complaints/Complaints';

const main = () => {
    return(
        <div>
            <BrowserRouter>
                <Dashboard />
                <Switch>
                    <Route path='/buzz' component={Buzz} />
                    <Route path='/complaints' component={Complaints} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default main;