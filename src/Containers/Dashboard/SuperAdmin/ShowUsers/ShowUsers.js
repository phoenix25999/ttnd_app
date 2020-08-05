import React, { useState } from 'react';
import axios from 'axios';
import EditUser from '../EditUser/EditUser';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../../../store/actions/index';

import styles from './ShowUsers.module.css';


const ShowUsers = props => {
    const [showEditSection, setShowEditSection] = useState(false);

    const deleteUser = ( userId ) => {
        axios.delete(`http://localhost:5000/user/${userId}`)
            .then(res=>{
                props.fetchUsers(props.userID);
            })
    }

    return(

        <tr key={props.user._id} className={styles.ShowUsers}>
            <td>{props.user.name} </td>
            <td>{props.user.email}</td>
            <td>{props.user.role}</td>
            <td>
                <button onClick={()=>setShowEditSection(!showEditSection)}>Edit</button>

                <button onClick={()=>deleteUser(props.user._id)} >Delete</button>
                {showEditSection?
                <EditUser user={props.user} clicked={()=>setShowEditSection(false)} show={showEditSection}/>:''}
            </td>
        </tr>
    )
}

const mapStateToProps = ({user}) => {
    return{
        userID: user.userData._id
    };
}

const mapDispatchToProps = dispatch => {
    return{
        fetchUsers: ( userID ) => (dispatch( fetchAllUsers( userID ) ))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowUsers);