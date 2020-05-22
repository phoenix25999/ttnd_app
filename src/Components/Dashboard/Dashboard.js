import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import Logo from '../../assets/logo.png';
import Head from '../../assets/head.jpg';

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

    logoutHandler = async() => {
        const response = await axios.get('http://localhost:5000/auth/logout');
        this.props.history.push('/');
        alert(response.data);
    }

    render(){
        return(
            <div className={styles.Dashboard}>
                <div> 
                    <img src={Logo} alt='ttn logo' />
                    <img src={Head} alt='main'/>
                </div>
                <h1>Hello {this.state.name}</h1>
                <h1>Buzz...</h1>

                <button onClick={this.logoutHandler}>Logout</button>
            </div>
        )
    }
}

export default withRouter(Dashboard);