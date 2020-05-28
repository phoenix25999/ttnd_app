import React from 'react';
import styles from './Banner.module.css';

const banner = () => {
    
    return(
        <div className={styles.Banner}>
            <div className={styles.Overlay}>
                <h1>CREATING BUZZ AROUND YOU</h1>
                <h1>NEVER BEEN SO EASY...</h1>
            </div>
        </div>
    );
};

export default banner;