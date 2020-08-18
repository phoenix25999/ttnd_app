import React, { useState } from 'react';
import { checkValidity } from '../../Utility/validation';

import Logo from '../../assets/ttn-logo.jpg';

import styles from './Login.module.css';
import axios from 'axios';

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
    const [message, setMessage] = useState('');

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

        axios.get(`http://localhost:5000/login?email=${loginForm.email.value}&password=${loginForm.password.value}`)
            .then(res=>console.log(res));
    }

    const url = `http://localhost:5000/login?email=${loginForm.email.value}&password=${loginForm.password.value}`
    const errorMessage = <p>Pleas enter a valid data</p>
    return(
        <>
            <div className={styles.BackgroundImage}></div>
            <div className={styles.Login}>
                <img src={Logo} alt='logo'/>
                <h3>Login to TTND</h3>
                <form method="post">
                    <div>
                        <input 
                            placeholder='e-mail'
                            onChange={(e)=>inputChangeHandler(e, 'email')}
                            value={loginForm.email.value}
                            className={styles.Input}
                        />
                        {!loginForm.email.valid&&loginForm.email.touched?errorMessage:''}
                    </div>
                    <div>
                        <input 
                            type='password'
                            placeholder='Password'
                            onChange={(e)=>inputChangeHandler(e, 'password')}
                            value={loginForm.password.value}
                            className={styles.Input}
                        />
                        {!loginForm.password.valid&&loginForm.password.touched?errorMessage:''}
                    </div>
                    <button disabled={!formIsValid}><a href={url}>Login</a></button>
                </form>
            </div>
        </>
    )
}

export default Login;