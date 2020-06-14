import React from 'react';
import Logo from '../../assets/ttn-logo.jpg';
import styles from './Home.module.css';
import { FaGooglePlusG } from 'react-icons/fa';

const home = () => {
    window.document.title='TTND APP';
    return (
        <div className={styles.Home}>
            <div className={styles.BackgroundImage}></div>
                <div className={styles.Login}>
                    <img src={Logo} alt='logo' />
                    <p>Create Your Own Buzz...</p>
                    <a href='http://localhost:5000/auth/google'>
                        <FaGooglePlusG className={styles.GoogleLogo} />
                         Login with Google
                    </a>
                </div>
        </div>
    )
}

export default home;