import React, {useState, useEffect} from 'react';
import axios from 'axios';
import queryString from 'query-string';

import Logo from '../../../assets/ttn-logo.jpg';

import styles from './ChangePassword.module.css';
import { checkValidity } from '../../../Utility/validation';
import { withRouter } from 'react-router-dom';
import Toaster from '../../../Utility/Toaster/Toaster';

const ChangePassword = ( props ) => {

    

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

    const [password, setPassword] = useState(initialPassword);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [showValidationMessage, setShowValidationMessage] = useState(false);
    const [showToaster, setShowToaster] = useState(false);

    let errorMessage = <p>Please enter a valid data!</p>;

    useEffect(()=>{
        let token = {};
        token = queryString.parse(props.location.search);
        setEmail(token.email);
        if (Object.keys(token).length > 1) {
        sessionStorage.setItem('token', token.token);
        }

        // console.log(sessionStorage.getItem('token'));
    })


    const passwordHandler = ( event, passwordIdentifier ) => {

        setError('');

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

    const changePassword = ( event ) => {
        event.preventDefault();

        setShowValidationMessage(true);

        if(password.first.value!==password.repeated.value){
            setError('Passwords do not match');
        }

        else{
            if(password.first.valid){

                let userInfo = {
                    email: email,
                    password: password.first.value
                }

                axios.patch(`http://localhost:5000/updatePassword`, userInfo )
                    .then(res=>{
                        setPassword(initialPassword);
                        setShowToaster(true);
                        setTimeout(()=>setShowToaster(false), 2000);
                        console.log(res);
                    })
                    .catch(err=>console.log(err));
            }
        }
        }

    return(
        <>
            <div className={styles.BackgroundImage}></div>
            <div className={styles.ChangePassword}>
                <img src={Logo} alt='logo'/>
                <h3>Change Password</h3>

                <form method='post' onSubmit={changePassword}>
                    <div>
                        <input 
                            type='password'
                            placeholder='New Password'
                            value={password.first.value}
                            onChange={(e)=>passwordHandler(e, 'first')}
                            className={styles.Input}
                        />
                        {!password.first.valid&&password.first.touched&&showValidationMessage?errorMessage:''}
                    </div>
                    <div>
                        <input 
                            type='password'
                            placeholder='Confirm New Password'
                            value={password.repeated.value}
                            onChange={(e)=>passwordHandler(e, 'repeated')}
                            className={styles.Input}
                        />
                        {!password.repeated.valid&&password.repeated.touched&&showValidationMessage?errorMessage:''}
                    </div>
                    <p>{error}</p>
                    <button>Submit</button>
                </form>
            </div>
            {showToaster?<Toaster message='Password changed successfully!' />:''}
        </>
    )
}

export default withRouter(ChangePassword);