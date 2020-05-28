import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideNav.module.css';

const sideNav = () => {
    return(
        <ul className={styles.SideNav}>
            <li><NavLink to='/buzz' activeClassName={styles.active}>Buzz</NavLink></li>
            <li><NavLink to='/complaints'>Complaints</NavLink></li>
        </ul>
    );
};

export default sideNav;