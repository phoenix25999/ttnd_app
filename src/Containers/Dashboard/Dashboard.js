import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { withRouter, BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import TopBar from '../../Components/UI/TopBar/TopBar';
import Banner from '../../Components/UI/Banner/Banner';
import Container from '../../hoc/Container/Container';
import SideNav from '../../Components/UI/SideNav/SideNav';
import Buzz from './Buzz/Buzz';
import Complaints from './Complaints/Complaint';
import Resolve from './Resolve/Resolve';
import * as actions from '../../store/actions/index';


import styles from './Dashboard.module.css';

class Dashboard extends Component{

    componentDidMount(){
        let token = {};
        token = queryString.parse(this.props.location.search);
        
        if (Object.keys(token).length > 1) {
        sessionStorage.setItem("token", token.token);
        }

        this.props.fetchUser(sessionStorage.getItem('token'));
    }

    logoutHandler = async() => {
        const response = await axios.get('http://localhost:5000/auth/logout');
        this.props.history.push('/');
        sessionStorage.removeItem('token');
        alert(response.data);
    }

    render(){
         let routes=(
            <Switch>
                <Route path='/dashboard/buzz' component={Buzz} />
                <Route path='/dashboard/complaints' component={Complaints} />
                <Route path='/dashboard/resolve' component={Resolve} />
            </Switch>
        );
        if(this.props.role==='employee'){
            routes=(
                <Switch>
                    <Route path='/dashboard/buzz' component={Buzz} />
                    <Route path='/dashboard/complaints' component={Complaints} />
                </Switch>
            )
        }
        return(
            <BrowserRouter>    
                {this.props.valid ? 
                
                <div className={styles.Dashboard}>
                    <TopBar logout={this.logoutHandler}/>
                    <Banner className={styles.BannerImage} />

                    <Container>
                        <div className={styles.Nav}>
                            <nav>
                                <SideNav/>
                            </nav>

                            <div>
                                {routes}
                            </div>
                        </div>
                    </Container>       
                </div> : <h2>Invalid Login! Please Try Again</h2>}
            </BrowserRouter>
        )
    }
}

const mapStateToProps = state => {
    return{
        email: state.user.email,
        valid: state.user.valid,
        role: state.user.valid
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchUser: (token)=> dispatch( actions.fetchUser(token) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));