import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideNav.module.css';

const sideNav = (props) => {
    
    return(
        <ul className={styles.SideNav}>
            <li><NavLink to='/dashboard/buzz' activeClassName={styles.active}>Buzz</NavLink></li>
            <li><NavLink to='/dashboard/complaints' activeClassName={styles.active}>Complaints</NavLink></li>
            {props.role==='admin'?<li><NavLink to='/dashboard/resolve' activeClassName={styles.active}>Resolve</NavLink></li>:''}
        </ul>
    );
};

export default sideNav;