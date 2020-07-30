import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './SideNav.module.css';

const sideNav = (props) => {
    
    return(
        <ul className={styles.SideNav}>
            <li><NavLink to='/dashboard/buzz' activeClassName={styles.active}>Buzz</NavLink></li>
            <li><NavLink to='/dashboard/complaints' activeClassName={styles.active}>Complaints</NavLink></li>
            {props.role==='admin'?<li><NavLink to='/dashboard/resolve' activeClassName={styles.active}>Resolve</NavLink></li>:''}
            {props.role==='super-admin'?<li><NavLink to='/dashboard/users' activeClassName={styles.active}>Users</NavLink></li>:''}
        </ul>
    );
};

const mapStateToProps = state => {
    return{
        role: state.user.userData.role
    };
};

export default connect(mapStateToProps)(sideNav);