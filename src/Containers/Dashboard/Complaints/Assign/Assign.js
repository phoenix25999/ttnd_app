import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchAdmins, fetchComplaints } from '../../../../store/actions';
import Backdrop from '../../../../Components/UI/SideDrawer/Backdrop/Backdrop';


import styles from './Assign.module.css';


const Assign = ( props ) => {

    const[showAssignmentSection, setShowAssignmentSection] = useState(false);
    const [assignedAdmin, setAssignedAdmin] = useState('');

    useEffect(()=>props.fetchAdmins(props.complaint.department), []);

    const updateComplaintAssignment = (event) => {
        event.preventDefault();
        let complaintAssignment = {
            assignedTo: assignedAdmin
        }
        axios.patch(`http://localhost:5000/complaint/${props.complaint._id}`, complaintAssignment)
            .then(res=>{
                console.log(res);
                setShowAssignmentSection(false);
                props.fetchAllComplaints();
            });
    }

    return(
        <>
            <button onClick={()=>setShowAssignmentSection(true)} className={styles.AssignButton}>Assign</button>
            {showAssignmentSection?
            <>
            <Backdrop show={showAssignmentSection} clicked={()=>setShowAssignmentSection(false)}/>
            <div className={styles.Assign}>
                <form onSubmit={updateComplaintAssignment}>
                    <select onChange={(event)=>setAssignedAdmin(event.target.value)}>
                        <option value=''>Select whom to assign</option>
                        {
                            props.admins.map(admin=>{
                                return <option value={admin._id}>{admin.name}</option>
                            })
                        }
                    </select>
                    <button>Assign</button>
                </form>
            </div></>:''
            }
        </>
    );
};

const mapStateToProps = ({ user }) => {
    return{
        admins: user.adminsData
    };
};

const mapDispatchToProps = dispatch => {
    return{
        fetchAdmins: ( department ) => dispatch( fetchAdmins(department) ),
        fetchAllComplaints: () => dispatch( fetchComplaints )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assign);