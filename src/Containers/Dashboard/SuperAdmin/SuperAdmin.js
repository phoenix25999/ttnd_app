import React, { useEffect, useState } from 'react';
import * as actions from '../../../store/actions/index';

import styles from './SuperAdmin.module.css';
import { connect } from 'react-redux';
import axios from 'axios';
import{ checkValidity } from '../../../Utility/validation';
import ShowUsers from './ShowUsers/ShowUsers';
import ErrorHandler from '../../../Components/UI/ErrorHandler/ErrorHandler';
import Toaster from '../../../Utility/Toaster/Toaster';

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
        password: {
            value:'',
            validation: {
                required: true,
                isPassword: true
            },
            valid: false,
            touched: false
        },
        role:{
            value:'',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        department: {
            value:'',
            validation: {
                required: true
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

    const [userForm, setUserForm] = useState(initialUserForm);
    const [formIsValid, setFormIsValid] = useState(false);
    const [message, setMessage] = useState('');
    const [showError, setShowError] = useState(true);
    const [showToaster, setShowToaster] = useState(false);
  
    useEffect(()=>fetchUsers(userID), [userID, fetchUsers]);

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

        if(inputIdentifier==='role' && updatedFormElement.value==='EMPLOYEE'){
            userForm.department.valid=true;
        }
    }

    const addUser = (event) => {
        event.preventDefault();

        if(userForm.role.value==='EMPLOYEE' && userForm.department.value){
            userForm.department.value='';
        }

        

        let userData = {};
        for(let i in userForm){
            userData={
                ...userData,
                [i]: userForm[i].value
            };
        }

        axios.post('http://localhost:5000/user', userData)
            .then(res=>{
                if(!res.data){
                    setMessage('User already exists! Try again with a different email');
                }
                else{
                setUserForm(initialUserForm);
                fetchUsers(userID);
                setShowToaster(true);
                setTimeout(()=>setShowToaster(false), 3000);
                }
            })
            .catch(err=>alert(err.message));
    }

    

    let usersData = [];
        if(users.length){
            usersData = users.map(user=> {
            return(
                <ShowUsers user={user} key={user._id} setMessage={setMessage} emptyUserForm={initialUserForm} clearUserForm={setUserForm} />

            )
        })
        }

    let errorMesssage = <p>Please enter valid data</p>;

    return(
        <div>

            <div className={styles.AddUser}>
                <h3>Add user</h3>
                <form method="post" onSubmit={addUser}>
                <p>{message}</p>
                    <div className={styles.Name}>
                        <div>
                            <input 
                                placeholder='Firstname'
                                onChange={(e)=>inputChangeHandler(e, 'firstname')}
                                value={userForm.firstname.value}
                                className={styles.Input}
                            />
                            {!userForm.firstname.valid&&userForm.firstname.touched?errorMesssage:''}
                        </div>
                        <div>
                            <input 
                                placeholder='Lastname'
                                onChange={(e)=>inputChangeHandler(e, 'lastname')}
                                value={userForm.lastname.value}
                                className={styles.Input}
                            />
                            {!userForm.lastname.valid&&userForm.lastname.touched?errorMesssage:''}
                        </div>
                    </div>
                    <div>
                        <div>
                            <input 
                                placeholder='e-mail'
                                onChange={(e)=>inputChangeHandler(e, 'email')}
                                value={userForm.email.value}
                                className={styles.Input}
                            />
                            {!userForm.email.valid&&userForm.email.touched?errorMesssage:''}
                        </div>
                        <div>
                            <input 
                                type='password'
                                placeholder='Password'
                                onChange={(e)=>inputChangeHandler(e, 'password')}
                                value={userForm.password.value}
                                className={styles.Input}
                            />
                            {!userForm.password.valid&&userForm.password.touched?errorMesssage:''}
                        </div>
                    </div>
                    <div>
                        <div>
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
                        </div>
                        <div>
                            <select 
                                onChange={(e)=>inputChangeHandler(e, 'department')}
                                value={userForm.department.value}
                                className={styles.Select}
                                disabled={userForm.role.value==='ADMIN'?false:true}
                            >
                                <option value=''>Department</option>
                                <option value='Hardware' >Hardware</option>
                                <option value='Infra'>Infra</option>
                                <option value='Others'>Others</option>
                            </select>
                            {!userForm.department.valid&&userForm.department.touched?errorMesssage:''}
                        </div>      
                    </div>
                        <div className={styles.Gender}>
                        <label>Gender</label>
                            <div>
                                <div>
                                    <input type="radio" value='male' id="male" name="gender" onChange={(e)=>inputChangeHandler(e, 'gender')} checked={userForm.gender.value==='male'} />
                                    <label htmlFor="male">Male</label>
                                </div>

                                <div>
                                    <input type="radio" value='female' id="female" name="gender" onChange={(e)=>inputChangeHandler(e, 'gender')} checked={userForm.gender.value==='female'} />
                                    <label htmlFor="female">Female</label>
                                </div>

                                <div>
                                    <input type="radio" value='other' id="other" name="gender"  onChange={(e)=>inputChangeHandler(e, 'gender')} checked={userForm.gender.value==='other'} />
                                    <label htmlFor="other">Other</label>
                                </div>
                            </div>
                            </div>
                    <button disabled={!formIsValid}>Add User</button>
                </form>
                {showToaster?<Toaster message='User created successfully!'/>:''}

            </div>

            <div className={styles.SuperAdmin}>
                <h3>Users</h3>
                {props.error&&showError?<ErrorHandler clicked={()=>setShowError(false)}/>:<table>
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
                }
            </div>

            
        </div>
    );
}

const mapStateToProps = ({user}) => {
    return{
        userID: user.userData._id,
        users: user.allUsersData,
        error: user.error
    };
}

const mapDispatchToProps = dispatch => {
    return{
        fetchUsers: ( userID ) => (dispatch(actions.fetchAllUsers( userID )))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdmin);