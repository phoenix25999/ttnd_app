import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
import styles from './Resolve.module.css';
import { fetchAssignedComplaints } from '../../../store/actions';

class YourComplaints extends Component{

    state = {
        status: ''
    }

    componentDidMount(){
        window.document.title='Resolve';
    
        this.props.fetchAssignedComplaints(this.props.userId);
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

    changeHandler = (event) => {
        
        this.setState({status: event.target.value}); 
    }

    updateStatus = ( complaintId ) => {
        axios.patch(`http://localhost:5000/complaint/${complaintId}`, this.state)
            .then(res=>{
                this.props.fetchAssignedComplaints(this.props.userId);
                alert('Status updated successfully!')
            });
        
    }

    render(){

        let complaintsData = this.props.complaintsData.map(complaint=> {
            let statusClass = this.checkStatus(complaint.status)
            return(
                <tr key={complaint._id}>
                    <td>{complaint.department} </td>
                    <td style={{textDecoration:'underline', color:'#0000ff'}}>{complaint._id}</td>
                    <td >
                        <select className={statusClass} defaultValue={complaint.status} onChange={this.changeHandler}>
                        <option defaultValue="DEFAULT" disabled hidden >{complaint.status}</option>
                            <option value='Open'>Open</option>
                            <option value='In Progress'>In Progress</option>
                            <option value='Resolved'>Resolved</option>
                        </select>
                    </td>
                    <td><button onClick={()=>this.updateStatus(complaint._id)}>Update</button></td>
                </tr>
            )
        })

        return(
            <div className={styles.Resolve}>
                <h4>Assigned Complaints</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Department</th>
                            <th>Issue ID</th>
                            <th>Status</th>
                            <th>Action</th>
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

const mapStateToProps = ({user, complaints}) => {
    return{
        userId: user.userData._id,
        complaintsData: complaints.assignedComplaints
    };
};

const mapDispatchToProps = dispatch => {
    return{
        fetchAssignedComplaints: (adminId) => dispatch( fetchAssignedComplaints(adminId)  )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( YourComplaints );
