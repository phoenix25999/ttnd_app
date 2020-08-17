import React from 'react';

import styles from './Toaster.module.css';

const Toaster = ( props ) => {
    return(
        <div className={styles.Toaster}>
            <p style={{color:'#fff'}}>{props.message}</p>
        </div>
    )
}

export default Toaster;