import React from 'react';
import axios from 'axios';
import {FiLogOut} from 'react-icons/fi';
import Container from '../Container/Container';
import Logo from '../../../assets/logo.png';
import styles from './TopBar.module.css';

const topBar = (props) => {

    const logoutHandler = async() => {
        const response = await axios.get('http://localhost:5000/auth/logout');
        props.history.push('/');
        alert(response.data);
    }

    return(
        <div className={styles.TopBar}>
            <Container>
                <img src={Logo} alt='logo' className={styles.Logo}/>
                <div className={styles.Logout}>
                    <button className={styles.LogoutButton} onClick={logoutHandler}>
                        Logout <FiLogOut style={{marginLeft:'5px'}}/>
                    </button>
                    {props.children}
                </div>
            </Container>
        </div>
    );
};

export default topBar;