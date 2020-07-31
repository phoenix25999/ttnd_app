import React, { useState } from 'react';
import axios from 'axios';
import EditUser from '../EditUser/EditUser';

const ShowUsers = props => {
    const [showEditSection, setShowEditSection] = useState(false);

    const deleteUser = ( userId ) => {
        axios.delete(`http://localhost:5000/user/${userId}`)
            .then(res=>{
                console.log(res);
                //fetchUsers(userID);
            })
    }

    return(
        <tr key={props.user._id}>
            <td>{props.user.name} </td>
            <td>{props.user.email}</td>
            <td>{props.user.role}</td>
            <td>
                <button onClick={()=>setShowEditSection(!showEditSection)}>Edit</button>
                OR
                <button onClick={()=>deleteUser(props.user._id)} >Delete</button>
                {showEditSection?
                <EditUser user={props.user} clicked={()=>setShowEditSection(false)} show={showEditSection}/>:''}
            </td>
        </tr>
    )
}

export default ShowUsers;