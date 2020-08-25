import React, { useState } from 'react';
import { fetchComplaintsByUser } from '../../../../store/actions';
import { connect } from 'react-redux';
import Backdrop from '../../../../Components/UI/SideDrawer/Backdrop/Backdrop';

import styles from './FilterComplaints.module.css';

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

    const applyFilter = () => {
        props.fetchComplaints(props.email, category);
    }

    return(
        <>
            <Backdrop show={props.show} clicked={props.clicked} />
            <div className={styles.FilterComplaints}>
                <h3>Choose Category</h3>
                <div className={styles.Category}>
                    <div>
                        <input type="radio" value='Hardware' id="Hardware" name="category" onChange={(e)=>setCategory(e.target.value)} />
                        <label htmlFor="Hardware">Hardware</label>
                    </div>

                    <div>
                        <input type="radio" value='Infra' id="Infra" name="category" onChange={(e)=>setCategory(e.target.value)}  />
                        <label htmlFor="Infra">Infra</label>
                    </div>

                    <div>
                        <input type="radio" value='Other' id="Other" name="category" onChange={(e)=>setCategory(e.target.value)}  />
                        <label htmlFor="Other">Other</label>
                    </div>
                    <div>
                        <button onClick={applyFilter} disabled={!category.valid}>Apply filter</button>
                        <button onClick={props.clicked}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = ({user}) => {
    return{
        email: user.email
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchComplaints: ( email, category ) => dispatch( fetchComplaintsByUser(email, category) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterComplaints);