import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import styles from './YourComplaints.module.css';

class YourComplaints extends Component{

    componentDidMount(){
        this.props.fetchComplaintsByUser(this.props.email);
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
                    <td style={{textDecoration:'underline', color:'#0000ff'}}>{complaint._id}</td>
                    <td>Ashish Mishra</td>
                    <td className={statusClass}>{complaint.status}</td>
                </tr>
            )
        })
        }

        return(
            <div className={styles.YourComplaints}>
                <h4>Your Complaints</h4>
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
        );
    };
};

const mapStateToProps = state => {
    return{
        email: state.user.email,
        complaintsData: state.complaints.complaintsData
    };
};

const mapDispatchToProps = dispatch => {
    return{
        fetchComplaintsByUser: (email) => dispatch( actions.fetchComplaintsByUser(email) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( YourComplaints );