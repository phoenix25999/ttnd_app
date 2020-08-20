import React, { useState } from 'react';
import { checkValidity } from '../../Utility/validation';
import url from 'url';

import Logo from '../../assets/ttn-logo.jpg';

import styles from './Login.module.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Login = ( ) => {

    const initialLoginForm = {
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
        }
    }

    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const [formIsValid, setFormIsValid] = useState(false);
    const [showValidationMessage, setShowValidationMessage] = useState(false);
    const [error, setError] = useState('');
    const [redirectURL, setRedirectURL] =useState('');

    const inputChangeHandler = ( event, inputIdentifier ) => {

        const updatedLoginForm = {
            ...loginForm
        }

        const updatedFormElement = {
            ...updatedLoginForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;

        updatedLoginForm[inputIdentifier] = updatedFormElement;

        let isFormValid = true;

        for(let inputIdentifier in updatedLoginForm){
            isFormValid = updatedLoginForm[inputIdentifier].valid && isFormValid;
        }

        setFormIsValid(isFormValid);
        setLoginForm(updatedLoginForm);
    }

    const loginHandler = ( event ) => {
        event.preventDefault();
        setShowValidationMessage(true);

        const loginDetails = {
            email: loginForm.email.value,
            password: loginForm.password.value
        }

        if(formIsValid){
            axios.post('http://localhost:5000/login', loginDetails)
                .then(res=>setRedirectURL(res.data.redirectTo))
                .catch(err=>{
                    setError(err.response.data.message);// prints Request failed with status code 400
                });
        }
    }

    const errorMessage = <p>Please enter a valid data</p>
    return(
        <>
            {redirectURL?<Redirect to={redirectURL} />:''}
            <div className={styles.BackgroundImage}></div>
            <div className={styles.Login}>
                <img src={Logo} alt='logo'/>
                <h3>Login to TTND</h3>
                <form method='post' onSubmit={loginHandler} >
                    <div>
                        <input 
                            placeholder='e-mail'
                            onChange={(e)=>inputChangeHandler(e, 'email')}
                            value={loginForm.email.value}
                            className={styles.Input}
                        />
                        {!loginForm.email.valid&&loginForm.email.touched&&showValidationMessage?errorMessage:''}
                    </div>
                    <div>
                        <input 
                            type='password'
                            placeholder='Password'
                            onChange={(e)=>inputChangeHandler(e, 'password')}
                            value={loginForm.password.value}
                            className={styles.Input}
                        />
                        {!loginForm.password.valid&&loginForm.password.touched&&showValidationMessage?errorMessage:''}
                    </div>
                    <p>{error}</p>
                    <button>Login</button>
                </form>
            </div>
        </>
    )
}

export default Login;