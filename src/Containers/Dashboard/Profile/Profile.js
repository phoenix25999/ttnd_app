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
        userForm:{...this.props.userData}
    }

    componentDidMount(){

        this.props.fetchUser(sessionStorage.getItem('token'));
        
    }

    inputChangeHandler = (event, inputIdentifier) => {
       
        let updatedUserForm = {...this.state.userForm};
        updatedUserForm[inputIdentifier] = event.target.value;

        this.setState({userForm: updatedUserForm});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        let load = {
            ...this.state.userForm
        }
        axios.patch(`http://localhost:5000/user/${this.props.userData._id}`, load)
            .then(res=>this.props.fetchUser(sessionStorage.getItem('token')));
    }

    render(){

        

        return(
            <div>
                <TopBar />
                <Banner />
                <div className={styles.Profile}>
                    <div className={styles.Info}>
                        <h3>Profile</h3>
                        <img src={this.props.userData.picture} alt='profile-pic'/>
                        <p>{this.props.userData.name}</p>
                        <p>20 posts</p>
                        <p>{this.props.userData.about}</p>
                    </div>

                    <div className={styles.EditProfile}>
                        <h3>Update Profile</h3>
                        <form onSubmit={this.onSubmitHandler}>
                            <div className={styles.Name}>
                                <div>
                                    <label>First Name</label>
                                    <input type='text' value={this.state.userForm.length?this.state.userForm.name.split(' ')[0]:''} onChange={(e)=>this.inputChangeHandler(e, 'name')} />
                                </div>
                                <div>
                                    <label>Last Name</label>
                                    <input type='text' value={this.state.userForm.length?this.state.userForm.name.split(' ')[1]:''} onChange={(e)=>this.inputChangeHandler(e, 'name')} />
                                </div>
                            </div>

                            <label>Email</label>
                            <input type='email' value={this.props.userData.email} disabled />

                            <label>Tell everyone about yourself</label>
                            <textarea onChange={(e)=>this.inputChangeHandler(e, 'about')} value={this.state.userForm.about} />
                            <div>
                            <button>Save</button>
                            </div>
                        </form>
                    </div>

            </div>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        userData: state.user.userData
    };
};

const mapDispatchToProps = dispatch => {
    return{
        fetchUser: (token)=> dispatch( actions.fetchUser(token) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);