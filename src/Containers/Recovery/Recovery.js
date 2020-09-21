import React, { useState } from 'react';
import { checkValidity } from '../../Utility/validation';

import Logo from '../../assets/ttn-logo.jpg';

import axios from 'axios';

import styles from './Recovery.module.css';
import Toaster from '../../Utility/Toaster/Toaster';

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

    const [email, setEmail] = useState(initialEmail);
    const [error, setError] = useState('');
    const [showValidationMessage, setShowValidationMessage] = useState(false);
    const [showToaster, setShowToaster] = useState(false);

    let errorMessage = <p>Please enter a valid data!</p>
    
    const inputChangeHandler = ( event ) => {
        const updatedEmail = {
            ...email
        }

        updatedEmail.value = event.target.value;
        updatedEmail.valid = checkValidity(updatedEmail.value, updatedEmail.validation);
        updatedEmail.touched = true;

        setEmail(updatedEmail);
    }

    const onSubmitHandler = ( event ) => {
        event.preventDefault();
        setShowValidationMessage(true);
        if(email.valid){
            axios.get(`http://localhost:5000/recovery/${email.value}`)
                .then(res=>{
                    setEmail(initialEmail);
                    setError('');
                    setShowValidationMessage(false);
                    setShowToaster(true);
                    setTimeout(()=>setShowToaster(false), 2000);
                })
                .catch(err=>{
                    setError(err.response&&err.response.data.message);
                });
        }
    }

    

    return(
        <>
            <div className={styles.BackgroundImage}></div>
            <div className={styles.Recovery}>
                <img src={Logo} alt='logo'/>
                <h3>Recover your Account</h3>

                <form method='get' onSubmit={onSubmitHandler}>
                    <div>
                        <input 
                            placeholder='e-mail'
                            value={email.value}
                            onChange={inputChangeHandler}
                            className={styles.Input}
                        />
                        {!email.valid&&email.touched&&showValidationMessage?errorMessage:''}
                    </div>
                    <p>{error}</p>
                    <button>Submit</button>
                </form>
            </div>
            {showToaster?<Toaster message='Reset link sent to mail' />:''}
        </>
    )
}

export default Recovery