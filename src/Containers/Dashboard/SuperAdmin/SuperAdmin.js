import React, { useEffect, useState } from 'react';
import * as actions from '../../../store/actions/index';

import styles from './SuperAdmin.module.css';
import { connect } from 'react-redux';
import axios from 'axios';
import EditUser from './EditUser/EditUser';

const SuperAdmin = ( props ) => {

    window.document.title='Users';

    const {
        userID,
        users,
        fetchUsers
    } = props;

    const initialUserForm = {
        firstname: '',
        lastname: '',
        email: '',
        role:'admin'
    }

    const [userForm, setUserform] = useState(initialUserForm);
    const [showEditSection, setShowEditSection] = useState(false);

    useEffect(()=>fetchUsers(userID), [userID, fetchUsers]);

    const inputChangeHandler = ( event, inputIdentifier ) => {
        setUserform({...userForm, [inputIdentifier]: event.target.value});
    }

    const addUser = (event) => {
        event.preventDefault();

        axios.post('http://localhost:5000/user', userForm)
            .then(res=>{
                setUserform(initialUserForm);
                fetchUsers(userID);
            });
    }

    


    const deleteUser = ( userID ) => {
        axios.delete(`http://localhost:5000/user/${userID}`)
            .then(res=>{
                console.log(res);
                fetchUsers();
            })
    }

    let usersData = [];
        if(users.length){
            usersData = users.map(user=> {
            return(
                <tr key={user._id}>
                    <td>{user.name} </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                        <button onClick={()=>setShowEditSection(!showEditSection)}>Edit</button>
                        OR
                        <button onClick={()=>deleteUser(user._id)} >Delete</button>
                        {showEditSection?
                        <EditUser user={user} clicked={()=>setShowEditSection(false)} show={showEditSection}/>:''}
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