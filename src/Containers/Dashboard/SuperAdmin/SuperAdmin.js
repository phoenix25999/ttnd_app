import React, { useEffect, useState } from 'react';
import * as actions from '../../../store/actions/index';

import styles from './SuperAdmin.module.css';
import { connect } from 'react-redux';
import axios from 'axios';

const SuperAdmin = ( props ) => {

    const initialUserForm = {
        firstname: '',
        lastname: '',
        email: '',
        role:'admin'
    }

    const [userForm, setUserform] = useState(initialUserForm);
    const [showEditSection, setShowEditSection] = useState(false);

    useEffect(()=>props.fetchUsers(), []);

    const inputChangeHandler = ( event, inputIdentifier ) => {
        setUserform({...userForm, [inputIdentifier]: event.target.value});
        console.log(userForm);
    }

    const addUser = (event) => {
        event.preventDefault();

        axios.post('http://localhost:5000/user', userForm)
            .then(res=>{
                setUserform(initialUserForm);
                props.fetchUsers();
            });
    }

    const updateUser = (event, userID) => {
        event.preventDefault();

        let userDetails = {
            name: userForm.firstname + ' ' + userForm.lastname,
            email: userForm.email,
            role: userForm.role
        }

        axios.patch(`http://localhost:5000/user/${userID}`, userDetails)
            .then(res=>{
                console.log(res);
                props.fetchUsers();
            })
    }


    const deleteUser = ( userID ) => {
        axios.delete(`http://localhost:5000/user/${userID}`)
            .then(res=>{
                console.log(res);
                props.fetchUsers();
            })
    }

    let usersData = [];
        if(props.users){
            usersData = props.users.map(user=> {
            return(
                <tr key={user._id}>
                    <td>{user.name} </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                        <button onClick={()=>setShowEditSection(!showEditSection)}>Edit</button>
                        <button onClick={()=>deleteUser(user._id)} >Delete</button>
                        {showEditSection?<div>
                <h3>Edit User Details</h3>
                <form method="post" onSubmit={(e)=>updateUser(e, user._id)}>
                        <input type="text" placeholder="Firstname" value={user.name.split(' ')[0]} onChange={(e)=>inputChangeHandler(e, 'firstname')} />
                        <input type="text" placeholder="Lastname" value={user.name.split(' ')[1]} onChange={(e)=>inputChangeHandler(e, 'lastname')} />
                   
                    
                        <input type="email" placeholder="Enter your e-mail" value={user.email} onChange={(e)=>inputChangeHandler(e, 'email')} />
                        <select defaultValue={user.role} onChange={(e)=>inputChangeHandler(e, 'role')}>
                            <option>Role</option>
                            <option value='admin'>Admin</option>
                            <option value='employee'>Employee</option>
                        </select>
                    <button>Submit</button>

                </form>
                
            </div>:''}
                    </td>
                </tr>
            )
        })
        }

    return(
        <div>

            <div className={styles.AddUser}>
                <h3>Add user</h3>
                <form method="post" onSubmit={addUser}>
                    <div className={styles.Name}>
                        <input type="text" placeholder="Firstname" value={userForm.firstname} onChange={(e)=>inputChangeHandler(e, 'firstname')} />
                        <input type="text" placeholder="Lastname" value={userForm.lastname} onChange={(e)=>inputChangeHandler(e, 'lastname')} />
                    </div>
                    <div>
                        <input type="email" placeholder="Enter your e-mail" value={userForm.email} onChange={(e)=>inputChangeHandler(e, 'email')} />
                        <select onChange={(e)=>inputChangeHandler(e, 'role')}>
                            <option>Role</option>
                            <option value='admin'>Admin</option>
                            <option value='employee'>Employee</option>
                        </select>
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
        users: state.user.allUsersData
    };
}

const mapDispatchToProps = dispatch => {
    return{
        fetchUsers: () => (dispatch(actions.fetchAllUsers()))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdmin);