import React from 'react';
import Backdrop from './Backdrop/Backdrop';
import styles from './SideDrawer.module.css';
import {FiLogOut} from 'react-icons/fi';
import Logo from '../../../assets/logo.png';

const sideDrawer = (props) => {

    let attachedClasses = [styles.SideDrawer, styles.Close];

    if(props.open){
        attachedClasses = [styles.SideDrawer, styles.Open, styles.Logout];
    }

    return (
        <div>
            <Backdrop show={props.open} clicked={props.close} />
            
            <div className={attachedClasses.join(' ')}>
                <img src={Logo} alt='logo' className={styles.Logo}/>
                <span className={styles.UserName}>{props.name}</span>
                <button onClick={props.logout}>
                    Logout <FiLogOut style={{marginLeft:'5px'}}/>
                </button>
                
                
            </div>
        </div>
    );
}

export default sideDrawer;