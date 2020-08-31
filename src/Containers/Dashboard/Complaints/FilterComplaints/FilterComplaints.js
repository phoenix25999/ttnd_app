import React, { useState } from 'react';
import { fetchComplaintsByUser, fetchComplaints } from '../../../../store/actions';
import { connect } from 'react-redux';
import Backdrop from '../../../../Components/UI/SideDrawer/Backdrop/Backdrop';

import styles from './FilterComplaints.module.css';
import { checkValidity } from '../../../../Utility/validation';
import Toaster from '../../../../Utility/Toaster/Toaster';

const FilterComplaints = ( props ) => {

    const initialCategory = {
        value: '',
        validation:{
            required: true
        },
        valid: false,
        touched: false
    }

    const [category, setCategory] = useState(initialCategory);
    const [showToaster, setShowToaster] = useState(false);

    const inputChangeHandler = ( event ) => {
        const updatedCategory = {
            ...category
        };

        updatedCategory.value = event.target.value;
        updatedCategory.valid = checkValidity(updatedCategory.value, updatedCategory.validation);
        updatedCategory.touched = true;

        setCategory(updatedCategory);
    }

    const applyFilter = () => {
        props.fetchByUser?
        props.fetchComplaints(props.email, category.value, '')
        :
        props.fetchAllComplaints(category.value, '');
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
            <div className={styles.FilterComplaints}>
                <h3>Choose Category</h3>
                <div className={styles.Category}>
                    <div>
                        <input type="radio" value='Hardware' id="Hardware" name="category" onChange={inputChangeHandler} />
                        <label htmlFor="Hardware">Hardware</label>
                    </div>

                    <div>
                        <input type="radio" value='Infra' id="Infra" name="category" onChange={inputChangeHandler}  />
                        <label htmlFor="Infra">Infra</label>
                    </div>

                    <div>
                        <input type="radio" value='Other' id="Other" name="category" onChange={inputChangeHandler}  />
                        <label htmlFor="Other">Other</label>
                    </div>
                    <div>
                        <button onClick={applyFilter} disabled={!category.valid}>Apply filter</button>
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
        fetchComplaints: ( email, category ) => dispatch( fetchComplaintsByUser(email, category) ),
        fetchAllComplaints: ( department, sortBy ) => dispatch( fetchComplaints(department, sortBy) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterComplaints);