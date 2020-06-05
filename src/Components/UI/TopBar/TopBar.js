import React from 'react';
import Container from '../Container/Container';
import Logo from '../../../assets/logo.png';
import styles from './TopBar.module.css';

const topBar = (props) => {


    return(
        <div className={styles.TopBar}>
            <Container>
                <img src={Logo} alt='logo' className={styles.Logo}/>
                <div className={styles.Logout}>
                    
                    {props.children}
                </div>
            </Container>
        </div>
    );
};

export default topBar;