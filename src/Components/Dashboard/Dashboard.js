import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { withRouter, BrowserRouter, Switch, Route } from 'react-router-dom';
import TopBar from '../UI/TopBar/TopBar';
import Banner from '../UI/Banner/Banner';
import Container from '../UI/Container/Container';
import SideNav from '../UI/SideNav/SideNav';
import Buzz from '../Buzz/Buzz';
import Complaints from '../Complaints/Complaint';

import styles from './Dashboard.module.css';

class Dashboard extends Component{

    state = {
        name: ''
    }

    componentDidMount(){
        let token = {};
        token = queryString.parse(this.props.location.search);
        if (Object.keys(token).length > 1) {
        sessionStorage.setItem("token", token.token);
        }
        axios.get('http://localhost:5000', {
            headers: {'authorization': `bearer ${sessionStorage.getItem('token')}`}
        })
            .then(res=>this.setState({name: res.data.name}));
    }

    render(){
        return(
            <BrowserRouter>
                <div className={styles.Dashboard}>
                    <TopBar history={this.props.history}>{this.state.name}</TopBar>
                    <Banner className={styles.BannerImage} />

                    <Container>
                        <div className={styles.Nav}>
                            <nav>
                                <SideNav />
                            </nav>

                            <div>
                                <Switch>
                                    <Route path='/buzz' component={Buzz} />
                                    <Route path='/complaints' component={Complaints} />
                                </Switch>
                            </div>
                        </div>
                    </Container>       
                </div>
            </BrowserRouter>
        )
    }
}

export default withRouter(Dashboard);