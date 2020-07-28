import React, { useEffect } from 'react';
import * as actions from '../../../store/actions/index';

import styles from './SuperAdmin.module.css';
import { connect } from 'react-redux';

const SuperAdmin = ( props ) => {

    useEffect(()=>props.fetchUsers(), []);

    let usersData = [];
        if(props.users){
            usersData = props.users.map(user=> {
            return(
                <tr key={user._id}>
                    <td>{user.name} </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                </tr>
            )
        })
        }

    return(
        <div>

            <div>
                <h2>Add user</h2>

            </div>

            <div className={styles.SuperAdmin}>
                <h2>Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>Role</th>
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