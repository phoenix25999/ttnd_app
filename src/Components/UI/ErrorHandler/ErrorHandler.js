import React from 'react';
import Backdrop from '../SideDrawer/Backdrop/Backdrop';

import styles from './ErrorHandler.module.css';

const ErrorHandler = ( props ) => {
    return(
        <>
            <Backdrop show={true} clicked={props.clicked}/>
            <div className={styles.ErrorHandler}>
                <h3>Something went wrong! Please try again after some time</h3>
            </div>
        </>
    )
}

export default  ErrorHandler;