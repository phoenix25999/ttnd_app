import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Backdrop from '../../../../Components/UI/SideDrawer/Backdrop/Backdrop';
import { fetchAllUsers } from '../../../../store/actions/index';
import { checkValidity } from '../../../../Utility/validation';

import styles from './EditUser.module.css';
import Toaster from '../../../../Utility/Toaster/Toaster';


const EditUser = ( props ) => {

    const initialUserForm = {
        firstname: {
            value: props.user.name.split(' ')[0],
            validation: {
                required: true,
                minLength: 2
            },
            valid: true,
            touched: false
        },
        lastname: {
            value:props.user.name.split(' ')[1],
            validation: {
                required: true,
                minLength: 2
            },
            valid: true,
            touched: false
        },
        email: {
            value:props.user.email,
            validation: {
                required: true,
                isEmail: true
            },
            valid: true,
            touched: false
        },
        role:{
            options: [
                {value: 'ADMIN', displayValue: 'ADMIN'},
                {value: 'EMPLOYEE', displayValue: 'EMPLOYEE'},
            ],
            value:props.user.role,
            validation: {
                required: true
            },
            valid: true,
            touched: false
        }
    }

    const [userForm, setUserForm] = useState(initialUserForm);
    const [formIsValid, setFormIsValid] = useState(false);
    const [message, setMessage] = useState('');
    const [showToaster, setShowToaster] = useState(false);

   
        const inputChangeHandler = ( event, inputIdentifier ) => {

            const updatedUserForm = {
                ...userForm
            }
    
            const updatedFormElement = {
                ...updatedUserForm[inputIdentifier]
            }
    
            updatedFormElement.value = event.target.value;
            updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
            updatedFormElement.touched = true;
    
            updatedUserForm[inputIdentifier] = updatedFormElement;

            let isFormValid = true;
    
            for(let inputIdentifier in updatedUserForm){
                isFormValid = updatedUserForm[inputIdentifier].valid && isFormValid;
            }
    
            setFormIsValid(isFormValid);
            setUserForm(updatedUserForm);
            
        }

    const updateUser = (event ) => {
        event.preventDefault();

        let userDetails = {
            name: `${userForm.firstname.value} ${userForm.lastname.value}`,
            email: userForm.email.value,
            role: userForm.role.value
        }

        let updatedUserDetails = {}

        for(let i in userDetails){
            if(userDetails[i]!==props.user[i]){
                updatedUserDetails = {
                    [i]: userDetails[i]
                };
            }
        }

        axios.patch(`http://localhost:5000/user/${props.user._id}`, updatedUserDetails)
            .then(res=>{
                if(!res.data){
                    setMessage('E-mail already exists!')
                }
                else{
                    props.fetchUsers(props.userID);
                    setShowToaster(true);
                    setTimeout(()=>{
                        props.clicked();
                        setShowToaster(false)
                    }, 2000);
                    props.clearUserForm(props.emptyUserForm)
                    props.setMessage('');
                }
            })
            .catch(err=>alert(err.message));
    }

    let errorMesssage = <p>Please enter valid data</p>;

    return(
        <>
        <div>
            <Backdrop show={props.show} clicked={props.clicked}/>
                <div className={styles.EditUser}>
                                
                    <h3>Edit User Details</h3>
                    <form method="post" onSubmit={updateUser}>
                            <input 
                                placeholder='Firstname'
                                onChange={(e)=>inputChangeHandler(e, 'firstname')}
                                value={userForm.firstname.value}
                                className={styles.Input}
                            />
                            {!userForm.firstname.valid&&userForm.firstname.touched?errorMesssage:''}

                            <input 
                                placeholder='Lastname'
                                onChange={(e)=>inputChangeHandler(e, 'lastname')}
                                value={userForm.lastname.value}
                                className={styles.Input}
                            />
                            {!userForm.lastname.valid&&userForm.lastname.touched?errorMesssage:''}

                            <input 
                                placeholder='e-mail'
                                onChange={(e)=>inputChangeHandler(e, 'email')}
                                value={userForm.email.value}
                                className={styles.Input}
                            />
                            {!userForm.email.valid&&userForm.email.touched?errorMesssage:''}
                            <select 
                                onChange={(e)=>inputChangeHandler(e, 'role')}
                                value={userForm.role.value}
                                className={styles.Select}
                            >

                                <option value=''>Role</option>
                                <option value='ADMIN' >ADMIN</option>
                                <option value='EMPLOYEE'>EMPLOYEE</option>
                            </select>
                            {!userForm.role.valid&&userForm.role.touched?errorMesssage:''}
                            <p>{message}</p>
                            <div id={styles.Button}>
                                <button disabled={!formIsValid}>Submit</button>
                                <button onClick={props.clicked}>Cancel</button>
                            </div>
                    </form>  
                    
                </div>
            </div>
            {showToaster?
                <>
                    <Backdrop show={showToaster} clicked={()=>setShowToaster(false)} />
                    <Toaster message='Changes saved successfully!'/>
                </>:''}
        </>
    )
}

const mapStateToProps = state => {
    return{
        userID: state.user.userData._id
    };
}

const mapDispatchToProps = dispatch => {
    return{
        fetchUsers: ( userID ) => ( dispatch( fetchAllUsers( userID ) ) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);