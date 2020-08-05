import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopBar from '../../../Components/UI/TopBar/TopBar';
import Banner from '../../../Components/UI/Banner/Banner';
import { fetchUser } from '../../../store/actions/index';
import { checkValidity } from '../../../Utility/validation';

import styles from './Profile.module.css';
import axios from 'axios';


class Profile extends Component{

    state = {
        userForm:{
            firstname: {
                value: this.props.userData.name&&this.props.userData.name.split(' ')[0],
                validation:{
                    required: true,
                    minLength: 2
                },
                valid: true,
                touched: false
            },
            lastname: {
                value: this.props.userData.name&&this.props.userData.name.split(' ')[1],
                validation:{
                    required: true,
                    minLength: 2
                },
                valid: true,
                touched: false
            },
            contact: {
                value: this.props.userData.contact,
                validation:{
                    minLength: 10,
                    maxLength: 11
                },
                valid: true,
                touched: false
            },
            age: {
                value: this.props.userData.age,
                validation:{
                    minLength: 2,
                    maxLength: 2
                },
                valid: true,
                touched: false
            },
            gender: {
                value: this.props.userData.gender,
                validation:{},
                valid: true,
                touched: false
            },
            about: {
                value: this.props.userData.about,
                validation:{
                    minLength: 10,
                    maxLength: 200
                },
                valid: true,
                touched: false
            }
        },
        formIsValid: false
    }

    componentDidMount(){

        this.props.fetchUser(sessionStorage.getItem('token'));
        
    }

    logoutHandler = async() => {
        const response = await axios.get('http://localhost:5000/auth/logout');
        this.props.history.push('/');
        localStorage.removeItem('token');
        alert(response.data);
    }

    inputChangeHandler = (event, inputIdentifier) => {
       
        const updatedUserForm = {
            ...this.state.userForm
        };

        const updatedFormElement = {
            ...updatedUserForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        console.log(updatedFormElement.valid);

        updatedUserForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for( let inputIdentifier in updatedUserForm ){
            console.log(updatedUserForm[inputIdentifier].valid)
            formIsValid = updatedUserForm[inputIdentifier].valid && formIsValid;
        }

        console.log(formIsValid);

        
        this.setState({userForm: updatedUserForm, formIsValid: formIsValid});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        let updatedUserDetails = {
            name: `${this.state.userForm.firstname.value} ${this.state.userForm.lastname.value}`,
            contact: this.state.userForm.contact.value,
            age: this.state.userForm.age.value,
            gender: this.state.userForm.gender.value,
            about: this.state.userForm.about.value

        }
        axios.patch(`http://localhost:5000/user/${this.props.userData._id}`, updatedUserDetails)
            .then(res=>{
                this.props.fetchUser(sessionStorage.getItem('token'));
                alert('Changes saved successfully!');
            });
    }

    render(){

        let errorMessage = 'Please enter a valid data';

        return(
            <div>
                <TopBar logout={this.logoutHandler}/>
                <Banner />
                <div className={styles.Profile}>
                    <div className={styles.Info}>
                        <h3>Profile</h3>
                        <img src={this.props.userData.picture} alt='profile-pic'/>
                        <p>{this.props.userData.name}</p>
                        <p>20 posts</p>
                        <p>About</p>
                        <p>{this.props.userData.about}</p>
                    </div>

                    <div className={styles.EditProfile}>
                        <h3>Update Profile</h3>
                        <form onSubmit={this.onSubmitHandler}>
                            <div className={styles.Name}>
                                <div>
                                    <label>First Name</label>
                                    <input type='text' value={this.state.userForm.firstname.value} onChange={(e)=>this.inputChangeHandler(e, 'firstname')}/>
                                    {!this.state.userForm.firstname.valid && this.state.userForm.firstname.touched ? <p>{errorMessage}</p> : ''}
                                </div>
                                <div>
                                    <label>Last Name</label>
                                    <input type='text' value={this.state.userForm.lastname.value} onChange={(e)=>this.inputChangeHandler(e, 'lastname')} />
                                    {!this.state.userForm.lastname.valid && this.state.userForm.lastname.touched ? <p>{errorMessage}</p> : ''}
                                </div>
                            </div>

                            <label>Email</label>
                            <input type='email' value={this.props.userData.email} disabled />

                            <label>Contact No.</label>
                            <input type='text' value={this.state.userForm.contact.value} onChange={(e)=>this.inputChangeHandler(e, 'contact')} />
                            {!this.state.userForm.contact.valid && this.state.userForm.contact.touched ? <p>{errorMessage}</p> : ''}

                            <label>Age</label>
                            <input type='text' value={this.state.userForm.age.value} onChange={(e)=>this.inputChangeHandler(e, 'age')}/>
                            {!this.state.userForm.age.valid && this.state.userForm.age.touched ? <p>{errorMessage}</p> : ''}

                            <label>Gender</label>
                            <div className={styles.Gender}>
                                <div>
                                    <input type="radio" value='male' id="male" name="gender" onChange={(e)=>this.inputChangeHandler(e, 'gender')} checked={this.state.userForm.gender.value==='male'?true:false} />
                                    <label for="male">Male</label>
                                </div>

                                <div>
                                    <input type="radio" value='female' id="female" name="gender" onChange={(e)=>this.inputChangeHandler(e, 'gender')} checked={this.state.userForm.gender.value==='female'?true:false} />
                                    <label for="female">Female</label>
                                </div>

                                <div>
                                    <input type="radio" value='other' id="other" name="gender"  onChange={(e)=>this.inputChangeHandler(e, 'gender')} checked={this.state.userForm.gender.value==='other'?true:false} />
                                    <label for="other">Other</label>
                                </div>
                            </div>

                            <label>Tell everyone about yourself</label>
                            <textarea onChange={(e)=>this.inputChangeHandler(e, 'about')} value={this.state.userForm.about.value} />
                            {!this.state.userForm.about.valid && this.state.userForm.about.touched ? <p>{errorMessage}</p> : ''}
                            <div>
                            <button disabled={!this.state.formIsValid}>Save</button>
                            </div>
                        </form>
                    </div>

            </div>
        </div>
        )
    }
}

const mapStateToProps = ({user}) => {
    return{
        userData: user.userData
    };
};

const mapDispatchToProps = dispatch => {
    return{
        fetchUser: (token)=> dispatch( fetchUser(token) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);