import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import TopBar from '../../../Components/UI/TopBar/TopBar';
import Banner from '../../../Components/UI/Banner/Banner';
import BuzzView from '../../../Components/UI/BuzzView/BuzzView';
import * as actions from '../../../store/actions/index';

import styles from './Profile.module.css';
import axios from 'axios';


class Profile extends Component{

    state = {
        about: '',
        edit: false
    }

    componentDidMount(){
        let token = {};
        token = queryString.parse(this.props.location.search);
        
        if (Object.keys(token).length > 1) {
        localStorage.setItem('token', token.token);
        }

        this.props.fetchUser(localStorage.getItem('token'));
        
        this.props.fetchBuzzByUser(this.props.userData._id);
    }

    inputChangeHandler = (event) => {
        this.setState({about: event.target.value});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        let load = {
            about: this.state.about
        }
        axios.patch('http://localhost:5000/user/profile/'+this.props.userData.email, load)
            .then(res=>console.log(res));
        this.setState({edit: false});
    }

    render(){

        let buzzData = [];
        if(this.props.buzzData){
          buzzData = this.props.buzzData.map(buzz=>{
            return(
                <BuzzView buzz={buzz} userID={this.props.userData._id} />
            );
        });
        }

        return(
            <div>
                <TopBar />
                <Banner />
                <div className={styles.Profile}>
                    <div className={styles.Info}>
                        <h3>Profile</h3>
                        <img src={this.props.userData.picture} alt='profile-pic'/>
                        <p>{this.props.userData.name}</p>
                        {console.log(this.props.userData)}
                        <p>20 posts</p>
                        <p>{this.props.userData.about}</p>
                        

                    {this.state.edit?
                    <div className={styles.EditProfile}>
                        <form onSubmit={this.onSubmitHandler}>
                            <label>Name</label>
                            <input type='text' value={this.props.userData.name} disabled />

                            <label>Email</label>
                            <input type='email' value={this.props.userData.email} disabled />

                            <label>Tell everyone about yourself</label>
                            <textarea onChange={this.inputChangeHandler} />
                            <button>Save</button>
                        </form>
                    </div>: <button onClick={()=>this.setState({edit: true})}>Edit</button>
                    }
                </div>

                <div className={styles.ShowBuzz}>
                    <h4>Your Posts</h4>
                    {buzzData}    
                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        userData: state.user.userData,
        buzzData: state.buzz.buzzData
    };
};

const mapDispatchToProps = dispatch => {
    return{
        fetchUser: (token)=> dispatch( actions.fetchUser(token) ),
        fetchBuzzByUser: (userID) => dispatch(actions.fetchBuzzByUser(userID))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);