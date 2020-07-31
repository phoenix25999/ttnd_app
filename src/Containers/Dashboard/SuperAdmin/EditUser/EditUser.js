import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Backdrop from '../../../../Components/UI/SideDrawer/Backdrop/Backdrop';
import UserForm from '../UserForm/UserForm';
import { fetchAllUsers } from '../../../../store/actions/index';
import { checkValidity } from '../../../../Utility/validation';

import styles from './EditUser.module.css';


const EditUser = ( props ) => {

    const initialUserForm = {
        firstname: {
            value: props.user.name.split(' ')[0],
            validation: {
                required: true,
                minLength: 2
            },
            valid: false,
            touched: false
        },
        lastname: {
            value:props.user.name.split(' ')[1],
            validation: {
                required: true,
                minLength: 2
            },
            valid: false,
            touched: false
        },
        email: {
            value:props.user.email,
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
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
            valid: false,
            touched: false
        }
    }

    const [userForm, setUserform] = useState(initialUserForm);
    const [formIsValid, setFormIsValid] = useState(false);

   
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
    
            let isFormValid = true;
    
            for(let inputIdentifier in updatedUserForm){
                isFormValid = updatedUserForm[inputIdentifier].valid && isFormValid;
                console.log(updatedUserForm[inputIdentifier].valid);
            }
    
            updatedUserForm[inputIdentifier] = updatedFormElement;
    
            setFormIsValid(isFormValid);
            setUserform(updatedUserForm);
            
            console.log(formIsValid);
        }

    const updateUser = (event ) => {
        event.preventDefault();

        let userDetails = {
            name: ` ${userForm.firstname.value} ${userForm.lastname.value}`,
            email: userForm.email.value,
            role: userForm.role.value
        }

        axios.patch(`http://localhost:5000/user/${props.user._id}`, userDetails)
            .then(res=>{
                props.fetchUsers(props.userID);
                props.clicked();
            });
    }

    return(
        <div>
            <Backdrop show={props.show} clicked={props.clicked}/>
            <div className={styles.EditUser}>
                            
                <h3>Edit User Details</h3>
                <form method="post" onSubmit={updateUser}>
                        <UserForm 
                            elementType='input'
                            placeholder='Firstname'
                            changed={(e)=>inputChangeHandler(e, 'firstname')}
                            value={userForm.firstname.value}
                            invalid={!userForm.firstname.valid}
                            touched={userForm.firstname.touched}
                            className={styles.Input}
                        />

                        <UserForm 
                            elementType='input'
                            placeholder='Lastname'
                            changed={(e)=>inputChangeHandler(e, 'lastname')}
                            value={userForm.lastname.value}
                            invalid={!userForm.lastname.valid}
                            touched={userForm.lastname.touched}
                            className={styles.Input}
                        />

                        <UserForm 
                            elementType='input'
                            placeholder='e-mail'
                            changed={(e)=>inputChangeHandler(e, 'email')}
                            value={userForm.email.value}
                            invalid={!userForm.email.valid}
                            touched={userForm.email.touched}
                            className={styles.Input}
                        />
                        <UserForm 
                            elementType='select'
                            options={userForm.role.options}
                            changed={(e)=>inputChangeHandler(e, 'role')}
                            value={userForm.role.value}
                            invalid={!userForm.role.valid}
                            touched={userForm.role.touched}
                            label='Role'
                            className={styles.Select}
                        />
                    <div>
                        <button>Submit</button>
                         <button onClick={props.clicked}>Cancel</button>
                    </div>

                </form>
                
            </div>
        </div>
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