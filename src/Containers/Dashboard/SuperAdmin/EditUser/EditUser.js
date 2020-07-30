import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Backdrop from '../../../../Components/UI/SideDrawer/Backdrop/Backdrop';
import * as actions from '../../../../store/actions/index';

import styles from './EditUser.module.css';


const EditUser = ( props ) => {

    const initialUserForm = {
        firstname: props.user.name.split(' ')[0],
        lastname: props.user.name.split(' ')[1],
        email: props.user.email,
        role:props.user.role
    }

    const [userForm, setUserform] = useState(initialUserForm);

    const inputChangeHandler = ( event, inputIdentifier ) => {
        setUserform({...userForm, [inputIdentifier]: event.target.value});
    }

    const updateUser = (event ) => {
        event.preventDefault();

        let userDetails = {
            name: userForm.firstname + ' ' + userForm.lastname,
            email: userForm.email,
            role: userForm.role
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
                    <input type="text" placeholder="Firstname" value={userForm.firstname} onChange={(e)=>inputChangeHandler(e, 'firstname')} />
                    <input type="text" placeholder="Lastname" value={userForm.lastname} onChange={(e)=>inputChangeHandler(e, 'lastname')} />
                            
                                
                    <input type="email" placeholder="Enter your e-mail" value={userForm.email} onChange={(e)=>inputChangeHandler(e, 'email')} />
                    <select defaultValue={userForm.role} onChange={(e)=>inputChangeHandler(e, 'role')}>
                        <option>Role</option>
                        <option value='admin'>Admin</option>
                        <option value='employee'>Employee</option>
                    </select>
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
        fetchUsers: ( userID ) => (dispatch(actions.fetchAllUsers( userID )))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);