import React, { useEffect, useState } from 'react';
import * as actions from '../../../store/actions/index';

import styles from './SuperAdmin.module.css';
import { connect } from 'react-redux';
import axios from 'axios';

import UserForm from './UserForm/UserForm';
import{ checkValidity } from '../../../Utility/validation';
import ShowUsers from './ShowUsers/ShowUsers';

const SuperAdmin = ( props ) => {

    window.document.title='Users';

    const {
        userID,
        users,
        fetchUsers
    } = props;

    const initialUserForm = {
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
        role:{
            options: [
                {value: 'ADMIN', displayValue: 'ADMIN'},
                {value: 'EMPLOYEE', displayValue: 'EMPLOYEE'},
            ],
            value:'',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    }

    const [userForm, setUserform] = useState(initialUserForm);
    const [formIsValid, setFormIsValid] = useState(false);
    

    useEffect(()=>fetchUsers(userID), [userID, fetchUsers]);
    console.log(users);

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

    const addUser = (event) => {
        event.preventDefault();

        let userData = {};
        for(let i in userForm){
            userData={
                ...userData,
                [i]: userForm[i].value
            };
        }

        if(formIsValid){
        axios.post('http://localhost:5000/user', userData)
            .then(res=>{
                console.log(res);
                setUserform(initialUserForm);
                fetchUsers(userID);
            });
        }
        else{
            alert('Enter Correct Information');
        }
    }

    

    let usersData = [];
        if(users.length){
            usersData = users.map(user=> {
            return(
                <ShowUsers user={user}/>
            )
        })
        }

    return(
        <div>

            <div className={styles.AddUser}>
                <h3>Add user</h3>
                <form method="post" onSubmit={addUser}>
                    <div className={styles.Name}>
                        {/* <input type="text" placeholder="Firstname" value={userForm.firstname} onChange={(e)=>inputChangeHandler(e, 'firstname')} />
                        <input type="text" placeholder="Lastname" value={userForm.lastname} onChange={(e)=>inputChangeHandler(e, 'lastname')} /> */}
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
                    </div>
                    <div>
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
                    </div>
                    <button>Add User</button>
                </form>

            </div>

            <div className={styles.SuperAdmin}>
                <h3>Users</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {usersData}
                    </tbody>
                </table>
            </div>

            
        </div>
    );
}

const mapStateToProps = state => {
    return{
        userID: state.user.userData._id,
        users: state.user.allUsersData
    };
}

const mapDispatchToProps = dispatch => {
    return{
        fetchUsers: ( userID ) => (dispatch(actions.fetchAllUsers( userID )))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdmin);