import React, { useState } from 'react';
import { checkValidity } from '../../Utility/validation';
import axios from 'axios';

import Logo from '../../assets/ttn-logo.jpg';

import styles from './Signup.module.css';
import Toaster from '../../Utility/Toaster/Toaster';
import { NavLink } from 'react-router-dom';

const Signup = ( ) => {

    const initialSignupForm = {
        firstname: {
            value:'',
            validation: {
                required: true,
                minLength: 2
            },
            valid: false,
            touched: false
        },
        lastname: {
            value:'',
            validation: {
                required: true,
                minLength: 2
            },
            valid: false,
            touched: false
        },
        email: {
            value:'',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            value:'',
            validation: {
                required: true,
                isPassword: true
            },
            valid: false,
            touched: false
        },
        gender: {
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
        }
    }

    const [signupForm, setSignupForm] = useState(initialSignupForm);
    const [formIsValid, setFormIsValid] = useState(false);
    const [showValidationMessage, setShowValidationMessage] = useState(false);
    const [showToaster, setShowToaster] = useState(false);
    const [error, setError] = useState('');

    const inputChangeHandler = ( event, inputIdentifier ) => {

        const updatedSignupForm = {
            ...signupForm
        }

        const updatedFormElement = {
            ...updatedSignupForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;

        updatedSignupForm[inputIdentifier] = updatedFormElement;

        let isFormValid = true;

        for(let inputIdentifier in updatedSignupForm){
            isFormValid = updatedSignupForm[inputIdentifier].valid && isFormValid;
        }

        setFormIsValid(isFormValid);
        setSignupForm(updatedSignupForm);
    }

    const loginHandler = ( event ) => {
        event.preventDefault();
        setShowValidationMessage(true);

        let userData = {};
        for(let i in signupForm){
            userData={
                ...userData,
                [i]: signupForm[i].value
            };
        }

        if(formIsValid){
            axios.post(`http://localhost:5000/user`, userData)
                .then(res=>{
                    if(!res.data){
                        setError('User already exist');
                    }
                    else{
                        setSignupForm(initialSignupForm);
                        setShowValidationMessage(false);
                        setError('');
                        setShowToaster(true);
                        setTimeout(()=>setShowToaster(false), 3000);
                    }
                });
        }
    }

    const errorMessage = <p>Please enter a valid data</p>
    return(
        <>
            <div className={styles.BackgroundImage}></div>
            <div className={styles.Signup}>
                <img src={Logo} alt='logo'/>
                <h3>Sign Up</h3>
                <form method='post' onSubmit={loginHandler} >
                    <div>
                        <input 
                            placeholder='Firstname'
                            onChange={(e)=>inputChangeHandler(e, 'firstname')}
                            value={signupForm.firstname.value}
                            className={styles.Input}
                        />
                        {!signupForm.firstname.valid&&showValidationMessage?errorMessage:''}
                    </div>
                    <div>
                        <input 
                            placeholder='Lastname'
                            onChange={(e)=>inputChangeHandler(e, 'lastname')}
                            value={signupForm.lastname.value}
                            className={styles.Input}
                        />
                        {!signupForm.lastname.valid&&showValidationMessage?errorMessage:''}
                    </div>
                    <div>
                        <input 
                            placeholder='e-mail'
                            onChange={(e)=>inputChangeHandler(e, 'email')}
                            value={signupForm.email.value}
                            className={styles.Input}
                        />
                        {!signupForm.email.valid&showValidationMessage?errorMessage:''}
                    </div>
                    <div>
                        <input 
                            type='password'
                            placeholder='Password'
                            onChange={(e)=>inputChangeHandler(e, 'password')}
                            value={signupForm.password.value}
                            className={styles.Input}
                        />
                        {!signupForm.password.valid&&showValidationMessage?errorMessage:''}
                    </div>
                    <div className={styles.Gender}>
                        <label>Gender</label>
                            <div>
                                <div>
                                    <input type="radio" value='male' id="male" name="gender" onChange={(e)=>inputChangeHandler(e, 'gender')} checked={signupForm.gender.value==='male'} />
                                    <label htmlFor="male">Male</label>
                                </div>

                                <div>
                                    <input type="radio" value='female' id="female" name="gender" onChange={(e)=>inputChangeHandler(e, 'gender')} checked={signupForm.gender.value==='female'} />
                                    <label htmlFor="female">Female</label>
                                </div>

                                <div>
                                    <input type="radio" value='other' id="other" name="gender"  onChange={(e)=>inputChangeHandler(e, 'gender')} checked={signupForm.gender.value==='other'} />
                                    <label htmlFor="other">Other</label>
                                </div>   
                            </div>
                            {!signupForm.gender.valid&&showValidationMessage?errorMessage:''}
                    </div>
                    <p>{error}</p>
                    <button>Signup</button>
                </form>
                <NavLink to='/login'>Signed Up? Login</NavLink>
            </div>
            {showToaster?<Toaster message="You're signed up! Please Login" />:''}
        </>
    )
}

export default Signup;