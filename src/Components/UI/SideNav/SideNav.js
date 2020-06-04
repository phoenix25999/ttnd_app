import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideNav.module.css';

const sideNav = () => {
    return(
        <ul className={styles.SideNav}>
            <li><NavLink to='/dashboard/buzz' activeClassName={styles.active}>Buzz</NavLink></li>
            <li><NavLink to='/dashboard/complaints'>Complaints</NavLink></li>
            <li><NavLink to='/dashboard/resolve'>Resolve</NavLink></li>
        </ul>
    );
};

export default sideNav;