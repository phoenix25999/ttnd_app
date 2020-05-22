import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

class Buzz extends Component{

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
        return (
            <div>
                <h1>Hello {this.state.name}</h1>
                <h1>Buzz...</h1>

                <button onClick={this.logoutHandler}>Logout</button>
            </div>
        )
    };
};

export default withRouter(Buzz);