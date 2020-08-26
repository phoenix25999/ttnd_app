import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isSuperAdmin } from '../../../../Utility/checkUserRole';
import { FaFilter, FaSort } from 'react-icons/fa';
import * as actions from '../../../../store/actions/index';
import styles from './YourComplaints.module.css';
import Assign from '../Assign/Assign';
import FilterComplaints from '../FilterComplaints/FilterComplaints';
import SortComplaints from '../SortComplaints/SortComplaints';
import ShowComplaints from '../ShowComplaints/ShowComplaints';

class YourComplaints extends Component{

    state={
        showSortingSection: false,
        showFilterSection: false,
        showComplaintDetails: false,
        fetchByUser: false
    }


    componentDidMount(){
        this.props.fetchComplaintsByUser(this.props.email, '', '');
        if(isSuperAdmin(this.props.role)){
            this.props.fetchAllComplaints('', '');
        }
    }

    checkStatus = (status) => {
        let color = '';
            switch(status){
                case 'Open':
                    color = styles.Open;
                    break;
                case 'In Progress':
                    color = styles.InProgress;
                    break;
                case 'Resolved':
                    color = styles.Resolved;
                    break;
                default:
                    color=''
            }
        return color;
    }

    render(){
        let complaintsData = [];
        if(this.props.complaintsData){
            complaintsData = this.props.complaintsData.map(complaint=> {
            let statusClass = this.checkStatus(complaint.status)
            return(
                <tr key={complaint._id}>
                    <td>{complaint.department} </td>
                    <td><ShowComplaints complaint={complaint} /></td>
                    <td>{complaint.assignedTo?complaint.assignedTo.name:'Not yet assigned'}</td>
                    <td className={statusClass}>{complaint.status}</td>
                </tr>
                
            )
        })
        }

        let allComplaintsData = [];
        if(this.props.allComplaintsData){
            allComplaintsData = this.props.allComplaintsData.map(complaint=> {
            let statusClass = this.checkStatus(complaint.status)
            return(
                <tr key={complaint._id}>
                    <td>{complaint.department} </td>
                    <td><ShowComplaints complaint={complaint}/></td>
                    <td>{complaint.assignedTo?complaint.assignedTo.name:'Not yet assigned'}</td>
                    <td className={statusClass}>{complaint.status}</td>
                    <td><Assign complaint={complaint}/></td>
                </tr>
            )
        })
        }

        return(
            <>
            {this.state.showFilterSection?<FilterComplaints fetchByUser={this.state.fetchByUser} show={this.state.showFilterSection} clicked={()=>this.setState({showFilterSection: false})} />:''}
            {this.state.showSortingSection?<SortComplaints fetchByUser={this.state.fetchByUser} show={this.state.showSortingSection} clicked={()=>this.setState({showSortingSection: false})} />:''}
            <div className={styles.YourComplaints}>
                <div>
                    <h4>Your Complaints</h4>
                    <div>
                        <button onClick={()=>this.setState({showSortingSection: true, fetchByUser: true})}><FaSort /></button>
                        <button onClick={()=>this.setState({showFilterSection: true, fetchByUser: true})}><FaFilter /></button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Department</th>
                            <th>Issue ID</th>
                            <th>Assigned To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaintsData}
                    </tbody>
                </table>
            </div>
            {
                isSuperAdmin(this.props.role)?
                <div className={styles.YourComplaints}>
                <div>
                    <h4>All Complaints</h4>
                    <div>
                        <button onClick={()=>this.setState({showSortingSection: true, fetchByUser: false})}><FaSort /></button>
                        <button onClick={()=>this.setState({showFilterSection: true, fetchByUser: false})}><FaFilter /></button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Department</th>
                            <th>Issue ID</th>
                            <th>Assigned To</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allComplaintsData}
                    </tbody>
                </table>
            </div>: ''
            }
            </>
        );
    };
};

const mapStateToProps = state => {
    return{
        role: state.user.userData.role,
        email: state.user.userData.email,
        complaintsData: state.complaints.complaintsData,
        allComplaintsData: state.complaints.allComplaintsData
    };
};

const mapDispatchToProps = dispatch => {
    return{
        fetchComplaintsByUser: (email, category, sortBy) => dispatch( actions.fetchComplaintsByUser(email, category, sortBy) ),
        fetchAllComplaints: ( department, sortBy ) => dispatch( actions.fetchComplaints( department, sortBy ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( YourComplaints );