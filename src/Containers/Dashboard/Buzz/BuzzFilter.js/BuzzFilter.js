import React, { useState } from 'react';
import {connect} from 'react-redux';
import styles from './BuzzFilter.module.css';
import Backdrop from '../../../../Components/UI/SideDrawer/Backdrop/Backdrop';
import { fetchBuzz } from '../../../../store/actions';

const BuzzFilter = ( props ) => {

    const [category, setCategory] = useState('');

    const applyFilter = () =>{
        const filter={category: category};

        console.log(filter);
        props.fetchBuzz(filter);
    }

    return(
        <>
            <Backdrop show={props.show} clicked={props.clicked} />

            <div className={styles.BuzzFilter}>
                <div className={styles.Category}>
                    <label>Category</label>
                        <div>
                            <input type="radio" value='Activity' id="Activity" name="category" onChange={(e)=>setCategory(e.target.value)} />
                            <label htmlFor="Activity">Activity</label>
                        </div>

                        <div>
                            <input type="radio" value='Lost and Found' id="Lost and Found" name="category" onChange={(e)=>setCategory(e.target.value)}  />
                            <label htmlFor="Lost and Found">Lost and Found</label>
                        </div>
                </div>
                <button onClick={applyFilter}>Apply filter</button>
            </div>
        </>
    );
};

const mapDispatchToProps = dispatch => {
    return{
        fetchBuzz: ( filter ) => dispatch( fetchBuzz(filter) )
    };
};

export default connect(null, mapDispatchToProps)(BuzzFilter);