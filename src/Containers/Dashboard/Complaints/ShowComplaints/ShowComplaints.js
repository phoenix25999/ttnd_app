import React, { useState } from 'react';

import styles from './ShowComplaints.module.css';
import Backdrop from '../../../../Components/UI/SideDrawer/Backdrop/Backdrop';

const ShowComplaints = ( props ) => {
    
    const [showComplaint, setShowComplaint] = useState(false);

    return(
        <>
            <button className={styles.Button} onClick={()=>setShowComplaint(true)}>{props.complaint._id} </button>
            {showComplaint?
            <>
                <Backdrop show={showComplaint} clicked={()=>setShowComplaint(false)} />
                <div className={styles.ShowComplaints}>
                    <h3>Your Complaint</h3>
                    <div className={styles.ComplaintDetails}>
                        <h4>Title: {props.complaint.title} </h4>
                        <h4>Issue:</h4>
                        <p>{props.complaint.concern}</p>
                    </div>
                </div>
            </>:''}
        </>
    )
}


export default (ShowComplaints);