import React, { useState } from 'react';
import {connect} from 'react-redux';
import styles from './BuzzFilter.module.css';
import Backdrop from '../../../../Components/UI/SideDrawer/Backdrop/Backdrop';
import { fetchBuzz } from '../../../../store/actions';
import ErrorHandler from '../../../../Components/UI/ErrorHandler/ErrorHandler';
import { checkValidity } from '../../../../Utility/validation';
import Toaster from '../../../../Utility/Toaster/Toaster';

const BuzzFilter = ( props ) => {

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

    const applyFilter = () =>{
        props.fetchBuzz(category.value);
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

            <div className={styles.BuzzFilter}>
            <h3>Choose Category</h3>
                <div className={styles.Category}>
                        <div>
                            <input type="radio" value='Activity' id="Activity" name="category" onChange={inputChangeHandler} />
                            <label htmlFor="Activity">Activity</label>
                        </div>

                        <div>
                            <input type="radio" value='Lost and Found' id="Lost and Found" name="category" onChange={inputChangeHandler}  />
                            <label htmlFor="Lost and Found">Lost and Found</label>
                        </div>
                        <div>
                            <button onClick={applyFilter} disabled={!category.valid}>Apply filter</button>
                            <button onClick={props.clicked}>Cancel</button>
                        </div>
                </div>
                
            </div>
            {showToaster?<Toaster message='Filter applied!'/>:''}
            {props.error?<ErrorHandler />:''}
            
        </>
            
    );
};

const mapStateToProps = ({buzz}) => {
    return{
        error: buzz.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchBuzz: ( category ) => dispatch( fetchBuzz(category) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuzzFilter);