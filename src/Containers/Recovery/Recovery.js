import React, { useState } from 'react';
import { checkValidity } from '../../Utility/validation';

import Logo from '../../assets/ttn-logo.jpg';

import axios from 'axios';

import styles from './Recovery.module.css';

const Recovery = ( ) => {

    const initialEmail = {
        value:'',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
    }

    const initialPassword = {
        first: {
            value:'',
            validation: {
                required: true,
                isPassword: true
            },
            valid: false,
            touched: false
        },
        repeated: {
            value:'',
            validation: {
                required: true,
                isPassword: true
            },
            valid: false,
            touched: false
        }
    }

    const [showEmailSection, setShowEmailSection] = useState(true);
    const [showPasswordSection, setShowPasswordSection] = useState(false);
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState(initialPassword);
    
    const inputChangeHandler = ( event ) => {
        const updatedEmail = {
            ...email
        }

        updatedEmail.value = event.target.value;
        updatedEmail.valid = checkValidity(updatedEmail.value, updatedEmail.validation);
        updatedEmail.touched = true;

        setEmail(updatedEmail);
    }

    const passwordHandler = ( event, passwordIdentifier ) => {
        const updatedPassword = {
            ...password
        }

        const updatedFormElement = {
            ...updatedPassword[passwordIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;

        updatedPassword[passwordIdentifier] = updatedFormElement;

        setPassword(updatedPassword);
    }

    const onSubmitHandler = ( event ) => {
        event.preventDefault();

        axios.get(`http://localhost:5000/recovery/${email.value}`)
            .then(res=>{
                setShowEmailSection(false);
                setShowPasswordSection(true);
            });
    }

    const changePassword = ( event ) => {
        event.preventDefault();

        let userInfo = {
            email: email.value,
            password: password.first.value
        }

        axios.patch(`http://localhost:5000/updatePassword`, userInfo )
            .then(res=>{
                console.log(res);
            })
            .catch(err=>console.log(err));
    }

    return(
        <>
            <div className={styles.BackgroundImage}></div>
            <div className={styles.Recovery}>
                <img src={Logo} alt='logo'/>
                <h3>Recover your Account</h3>
                {showEmailSection?
                <form method='get' onSubmit={onSubmitHandler}>
                    <div>
                        <input 
                            placeholder='e-mail'
                            value={email.value}
                            onChange={inputChangeHandler}
                            className={styles.Input}
                        />
                        {/* {!loginForm.email.valid&&loginForm.email.touched&&showValidationMessage?errorMessage:''} */}
                    </div>
                    {/* <p>{error}</p> */}
                    <button>Submit</button>
                </form>:''}
                {showPasswordSection?
                <form method='post' onSubmit={changePassword}>
                    <div>
                        <input 
                            type='password'
                            placeholder='New Password'
                            value={password.first.value}
                            onChange={(e)=>passwordHandler(e, 'first')}
                            className={styles.Input}
                        />
                        {/* {!loginForm.email.valid&&loginForm.email.touched&&showValidationMessage?errorMessage:''} */}
                    </div>
                    <div>
                        <input 
                            type='password'
                            placeholder='Confirm New Password'
                            value={password.repeated.value}
                            onChange={(e)=>passwordHandler(e, 'repeated')}
                            className={styles.Input}
                        />
                    </div>
                    <button>Submit</button>
                </form>:''}
            </div>
        </>
    )
}

export default Recovery