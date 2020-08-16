import React, { useState } from 'react';
import { connect } from 'react-redux';
import { checkValidity } from '../../../../Utility/validation';
import Backdrop from '../../../../Components/UI/SideDrawer/Backdrop/Backdrop';
import styles from './EditBuzz.module.css';
import axios from 'axios';
import { fetchBuzz } from '../../../../store/actions';

const EditBuzz = ( props ) => {

    const initialBuzzForm = {
        description: {
            value: props.buzz.description,
            validation: {
                required: true,
                minLength: 2
            },
            valid: true,
            touched: false
        },
        image: {
            value:props.buzz.image,
            validation: {},
            valid: true,
            touched: false
        },
        category:{
            value:props.buzz.category,
            validation: {
                required: true
            },
            valid: true,
            touched: false
        }
    }

    const [showEditSection, setShowEditSection] = useState(false);
    const [buzzForm, setBuzzForm] = useState(initialBuzzForm);
    const [formIsValid, setFormIsValid] = useState(false);
    const [message, setMessage] = useState('');

    const inputChangeHandler = ( event, inputIdentifier ) => {

        const updatedBuzzForm = {
            ...buzzForm
        }

        const updatedFormElement = {
            ...updatedBuzzForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;

        updatedBuzzForm[inputIdentifier] = updatedFormElement;

        let isFormValid = true;

        for(let inputIdentifier in updatedBuzzForm){
            isFormValid = updatedBuzzForm[inputIdentifier].valid && isFormValid;
        }

        setFormIsValid(isFormValid);
        setBuzzForm(updatedBuzzForm);
    }

    const updateBuzz = ( event ) => {
        event.preventDefault();
        let updatedBuzzDetails = {};

        for(let i in buzzForm){
            if(buzzForm[i].value!==props.buzz[i]){
                updatedBuzzDetails = {
                    [i]: buzzForm[i].value
                };
            }
        }

        axios.patch(`http://localhost:5000/buzz/${props.buzz._id}`, updatedBuzzDetails)
            .then(res=>{
                console.log(res);
                props.fetchBuzz();
                setShowEditSection(false);
                
            })
    }

    let errorMessage = <p>Please enter a valid data!</p>

    return(
        <>
            <button onClick={()=>setShowEditSection(true)}>Edit</button>
            {showEditSection? 
                <div>
                    <Backdrop show={showEditSection} clicked={()=>setShowEditSection(false)}/>
                    <div className={styles.EditBuzz}>
                        <h3>Edit Buzz</h3>
                        <form method='post' onSubmit={updateBuzz}>
                        <div>
                            <div className={styles.ImageBox}>{props.buzz.image.map(image=><div key={image}className={styles.Image}>
                                <img src={image} alt='buzz'/>
                            </div>)}</div>   
                        </div>
                            <textarea type='text' value={buzzForm.description.value} onChange={(e)=>inputChangeHandler(e, 'description')}/>
                            {!buzzForm.description.valid&&buzzForm.description.touched?errorMessage:''}

                            <select 
                                onChange={(e)=>inputChangeHandler(e, 'category')}
                                value={buzzForm.category.value}
                                className={styles.Select}
                            >

                                <option value=''>Category</option>
                                <option value='Activity' >Activity</option>
                                <option value='Lost and Found'>Lost and Found</option>
                            </select>
                            {!buzzForm.category.valid&&buzzForm.category.touched?errorMessage:''}

                            <div className={styles.Buttons}>
                                <button disabled={!formIsValid}>Submit</button>
                                <button onClick={()=>setShowEditSection(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    </div>:''
            }
        </>
    );
};

const mapDispatchToProps = dispatch => {
    return{
        fetchBuzz: () => dispatch( fetchBuzz() )
    };
};

export default connect(null, mapDispatchToProps)(EditBuzz);