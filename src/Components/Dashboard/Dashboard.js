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
import Resolve from '../Resolve/Resolve';
import {FiLogOut} from 'react-icons/fi';

import styles from './Dashboard.module.css';

class Dashboard extends Component{

    state = {
        name: '',
        email: '',
        role: '',
        valid: true
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
            .then(res=>{
                if(res.data.status===false){
                    this.setState({valid: false});
                }
                else{
                this.setState({name: res.data.name, email: res.data.email});
                axios.get('http://localhost:5000/user/role/'+res.data.email)
                    .then(res=>{
                        this.setState({role: res.data[0].role})
                    });
            }
            })
            .catch(err=>console.log(err));
    }

    logoutHandler = async() => {
        const response = await axios.get('http://localhost:5000/auth/logout');
        this.props.history.push('/');
        console.log(document.cookie);
        sessionStorage.getItem('token')
        sessionStorage.removeItem('token');
        alert(response.data);
    }

    render(){
         let routes=(
            <Switch>
                <Route path='/dashboard/buzz'><Buzz email={this.state.email} /></Route>
                <Route path='/dashboard/complaints' component={Complaints} />
                <Route path='/dashboard/resolve' component={Resolve} />
            </Switch>
        );
        if(this.state.role==='employee'){
            routes=(
                <Switch>
                    <Route path='/dashboard/buzz'><Buzz email={this.state.email} /></Route>
                    <Route path='/dashboard/complaints' component={Complaints} />
                </Switch>
            )
        }
        return(
            <BrowserRouter>    
                {this.state.valid ? 
                
                <div className={styles.Dashboard}>
                    <TopBar history={this.props.history}>
                        <button onClick={this.logoutHandler}>
                            Logout <FiLogOut style={{marginLeft:'5px'}}/>
                        </button>
                        {this.state.name}
                    </TopBar>
                    <Banner className={styles.BannerImage} />

                    <Container>
                        <div className={styles.Nav}>
                            <nav>
                                <SideNav role={this.state.role} />
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

export default withRouter(Dashboard);