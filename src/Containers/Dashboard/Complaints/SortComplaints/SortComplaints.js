import React, { useState } from 'react';
import { fetchComplaintsByUser, fetchComplaints } from '../../../../store/actions';
import { connect } from 'react-redux';
import Backdrop from '../../../../Components/UI/SideDrawer/Backdrop/Backdrop';

import styles from './SortComplaints.module.css';
import { checkValidity } from '../../../../Utility/validation';
import Toaster from '../../../../Utility/Toaster/Toaster';

const SortComplaints = ( props ) => {

    const initialSortingCriteria = {
        value: '',
        validation:{
            required: true
        },
        valid: false,
        touched: false
    }

    const [sortBy, setSortBy] = useState(initialSortingCriteria);
    const [showToaster, setShowToaster] = useState(false);

    const inputChangeHandler = ( event ) => {
        const updatedSortingCriteria = {
            ...sortBy
        };

        updatedSortingCriteria.value = event.target.value;
        updatedSortingCriteria.valid = checkValidity(updatedSortingCriteria.value, updatedSortingCriteria.validation);
        updatedSortingCriteria.touched = true;

        setSortBy(updatedSortingCriteria);
    }

    const applySorting = () => {
        props.fetchByUser?
        props.fetchComplaints(props.email, '', sortBy.value)
        :
        props.fetchAllComplaints('', sortBy.value);
        setShowToaster(true);
        setTimeout(
            ()=>{
                setShowToaster(false);
                props.clicked();
            }
        , 2000);
    }
    
    return(
        <>
            <Backdrop show={props.show} clicked={props.clicked} />
            <div className={styles.SortComplaints}>
                <h3>Sort By</h3>
                <div className={styles.Category}>
                    <div>
                        <input type="radio" value='-1' id="Latest" name="sortBy" onChange={inputChangeHandler} />
                        <label htmlFor="Latest">Latest</label>
                    </div>

                    <div>
                        <input type="radio" value='1' id="Oldest" name="sortBy" onChange={inputChangeHandler}  />
                        <label htmlFor="Oldest">Oldest</label>
                    </div>

                    <div>
                        <button onClick={applySorting} disabled={!sortBy.valid}>Submit</button>
                        <button onClick={props.clicked}>Cancel</button>
                    </div>
                </div>
            </div>
            {showToaster?<Toaster message='Filter Applied!' />:''}
        </>
    )
}

const mapStateToProps = ({user}) => {
    return{
        email: user.userData.email
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchComplaints: ( email, department, sortBy ) => dispatch( fetchComplaintsByUser(email, department, sortBy) ),
        fetchAllComplaints: ( department, sortBy ) => dispatch( fetchComplaints(department, sortBy) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortComplaints);