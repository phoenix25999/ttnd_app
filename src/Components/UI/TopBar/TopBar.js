import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SideDrawer from '../SideDrawer/SideDrawer';
import Container from '../../../hoc/Container/Container';
import Logo from '../../../assets/logo.png';
import styles from './TopBar.module.css';
import {FiLogOut} from 'react-icons/fi';
import {FaBars} from 'react-icons/fa';

const TopBar = (props) => {

    const[showSideDrawer, setShowSideDrawer] = useState(false);

    return(
        <div className={styles.TopBar}>
            <Container>
                <img src={Logo} alt='logo' className={styles.Logo}/>
                <div className={styles.Logout}>

                    <button onClick={props.logout}>
                        Logout <FiLogOut style={{marginLeft:'5px'}}/>
                    </button>
                    
                    <NavLink to='/profile' className={styles.userName}>{props.name}</NavLink>
                    <NavLink to='/dashboard' className={styles.userName}>Dashboard</NavLink>
                    <FaBars className={styles.DrawerToggle} onClick={()=> setShowSideDrawer(!showSideDrawer)} />
                </div>
                    

                {showSideDrawer ? <SideDrawer logout={props.logout} name={props.name }open={showSideDrawer} close={()=>setShowSideDrawer(!showSideDrawer)} /> : null}
            </Container>
        </div>
    );
};

const mapStateToProps = state => {
    return{
        name: state.user.userData.name 
    }
}

export default connect(mapStateToProps)(TopBar);