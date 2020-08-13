import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Backdrop from '../../../../Components/UI/SideDrawer/Backdrop/Backdrop';
import { fetchAdmins } from '../../../../store/actions';

import styles from './Assign.module.css';

const Assign = ( props ) => {

    useEffect(()=>props.fetchAdmins(props.complaint.department), []);

    return(
        <>
            <Backdrop show={props.show} clicked={props.clicked}/>
            <div className={styles.Assign}>
                <form>
                    <select>
                        <option value=''>Select whom to assign</option>
                        {
                            props.admins.map(admin=>{
                                return <option value={admin._id}>{admin.name}</option>
                            })
                        }
                    </select>
                    <button>Assign</button>
                </form>
            </div>
        </>
    );
};

const mapStateToProps = ({ user }) => {
    return{
        admins: user.adminsData
    };
};

const mapDispatchToProps = dispatch => {
    return{
        fetchAdmins: ( department ) => dispatch( fetchAdmins(department) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assign);