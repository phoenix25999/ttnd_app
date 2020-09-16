import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopBar from '../../../Components/UI/TopBar/TopBar';
import Banner from '../../../Components/UI/Banner/Banner';
import { fetchUser, getBuzzCountByUser } from '../../../store/actions/index';
import { checkValidity } from '../../../Utility/validation';
import { RiImageAddLine } from 'react-icons/ri';

import styles from './Profile.module.css';
import axios from 'axios';
import Toaster from '../../../Utility/Toaster/Toaster';


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
                value: this.props.userData.contact!=='undefined'?this.props.userData.contact:'',
                validation:{
                    minLength: 10,
                    maxLength: 10
                },
                valid: true,
                touched: false
            },
            age: {
                value: this.props.userData.age!=='undefined'?this.props.userData.age:'',
                validation:{
                    minValue: 18,
                    maxValue: 120
                },
                valid: true,
                touched: false
            },
            gender: {
                value: this.props.userData.gender!=='undefined'?this.props.userData.gender:'',
                validation:{},
                valid: true,
                touched: false
            },
            about: {
                value: this.props.userData.about!=='undefined'?this.props.userData.about:'',
                validation:{
                    minLength: 10,
                    maxLength: 200
                },
                valid: true,
                touched: false
            },
            image: {
                value: '',
                validation:{},
                valid: true,
                touched: false
            },
        },
        formIsValid: false,
        showToaster: false,
        passwordForm: {
            old: {
                value: '',
                validation:{
                    isPassword: true
                },
                valid: false,
                touched: false
            },
            new: {
                value: '',
                validation:{
                    isPassword: true
                },
                valid: false,
                touched: false
            },
            repeated: {
                value: '',
                validation:{
                    isPassword: true
                },
                valid: false,
                touched: false
            }
        },
        passwordFormIsValid: false
    }

    componentDidMount(){

        this.props.fetchUser(sessionStorage.getItem('token'));
        setTimeout(()=>this.props.getBuzzCount(this.props.userData._id),1000);
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

        if(inputIdentifier!=='image'){
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        }

        else{
            updatedFormElement.value = event.target.files;
            console.log(updatedFormElement.value);
        }

        updatedUserForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for( let inputIdentifier in updatedUserForm ){
            formIsValid = updatedUserForm[inputIdentifier].valid && formIsValid;
        }
        
        this.setState({userForm: updatedUserForm, formIsValid: formIsValid});
    }

    passwordHandler = (event, inputIdentifier) => {
       
        const updatedPasswordForm = {
            ...this.state.passwordForm
        };

        const updatedFormElement = {
            ...updatedPasswordForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;

        updatedPasswordForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for( let inputIdentifier in updatedPasswordForm ){
            formIsValid = updatedPasswordForm[inputIdentifier].valid && formIsValid;
        }
        
        this.setState({passwordForm: updatedPasswordForm, passwordFormIsValid: formIsValid});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        const updatedUserData = new FormData();
            updatedUserData.append('name', `${this.state.userForm.firstname.value} ${this.state.userForm.lastname.value}`);
            updatedUserData.append('contact', this.state.userForm.contact.value);
            updatedUserData.append('age', this.state.userForm.age.value);
            updatedUserData.append('gender', this.state.userForm.gender.value);
            updatedUserData.append('about', this.state.userForm.about.value);
            updatedUserData.append('profilePic', this.state.userForm.image.value[0]);

        const config = {
            headers: {
              'content-type': 'multipart/form-data'
              }
          }

        axios.patch(`http://localhost:5000/user/${this.props.userData._id}`, updatedUserData, config)
            .then(res=>{
                this.props.fetchUser(sessionStorage.getItem('token'));
                this.setState({showToaster: true});
                setTimeout(()=>this.setState({showToaster: false}), 3000)
            })
            .catch(error=>alert(error.message));
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
                        <p>{this.props.buzzCount} posts</p>
                        <p>About</p>
                        <p>{this.props.userData.about}</p>
                    </div>
                    <div className={styles.Wrapper}>
                    <div className={styles.EditProfile}>
                        <h3>Update Profile</h3>
                        <form  method="post" encType="multipart/form-data" onSubmit={this.onSubmitHandler}>
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

                            <div className={styles.ProfilePic}>
                                <label htmlFor='profilePic'>
                                   Update Profile Pic
                                   <span><RiImageAddLine title='Add image' className={styles.ImageButton}/>
                                   {this.state.userForm.image.value?this.state.userForm.image.value[0].name:'No file Chosen'}
                                   </span>
                                </label>
                                
                                <input 
                                    id='profilePic' 
                                    name='profilePic' 
                                    type='file' 
                                    accept='image/*'
                                    hidden
                                    onChange={(e)=>this.inputChangeHandler(e, 'image')}
                                />
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
                    {this.state.showToaster?<Toaster message='Changes saved successfully!' />:''}
                    <div className={styles.EditProfile}>
                        <h3>Update Password</h3>
                        <form  method="post" encType="multipart/form-data" onSubmit={this.onSubmitHandler}>
                            <div >
                                <div>
                                    <label>Old Password</label>
                                    <input type='password' value={this.state.passwordForm.old.value} onChange={(e)=>this.inputChangeHandler(e, 'old')}/>
                                    {!this.state.passwordForm.old.valid && this.state.passwordForm.old.touched ? <p>{errorMessage}</p> : ''}
                                </div>
                                <div>
                                    <label>New Password</label>
                                    <input type='password' value={this.state.passwordForm.new.value} onChange={(e)=>this.inputChangeHandler(e, 'new')}/>
                                    {!this.state.passwordForm.new.valid && this.state.passwordForm.new.touched ? <p>{errorMessage}</p> : ''}
                                </div>
                                <div>
                                    <label>Confirm New Password</label>
                                    <input type='password' value={this.state.passwordForm.repeated.value} onChange={(e)=>this.inputChangeHandler(e, 'repeated')} />
                                    {!this.state.passwordForm.repeated.valid && this.state.passwordForm.repeated.touched ? <p>{errorMessage}</p> : ''}
                                </div>
                            </div>
                        </form>
            </div>
            </div>
                    {this.state.showToaster?<Toaster message='Changes saved successfully!' />:''}
            </div>

            
            </div>
        )
    }
}

const mapStateToProps = ({user, buzz}) => {
    return{
        userData: user.userData,
        buzzCount: buzz.buzzCount
    };
};

const mapDispatchToProps = dispatch => {
    return{
        fetchUser: (token)=> dispatch( fetchUser(token) ),
        getBuzzCount: (userID)=> dispatch( getBuzzCountByUser(userID) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);