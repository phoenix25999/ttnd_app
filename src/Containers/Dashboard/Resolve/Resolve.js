import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import axios from 'axios';
import styles from './Resolve.module.css';

class YourComplaints extends Component{

    state = {
        updateStatus: {}
    }

    componentDidMount(){
        window.document.title='Resolve';
    
        this.props.fetchComplaints();
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

    changeHandler = (event, id) => {
        let statusInfo = {
            id: id,
            updatedStatus: event.target.value
        };
        this.setState({updateStatus: statusInfo}); 
    }

    updateStatus = () => {
        axios.put('http://localhost:5000/complaint/updateStatus', this.state.updateStatus)
            .then(res=>console.log(res));
        this.props.fetchComplaints();
    }

    render(){

        let complaintsData = this.props.complaintsData.map(complaint=> {
            let statusClass = this.checkStatus(complaint.status)
            return(
                <tr key={complaint._id}>
                    <td>{complaint.department} </td>
                    <td style={{textDecoration:'underline', color:'#0000ff'}}>{complaint.id}</td>
                    <td>Ashish Mishra</td>
                    <td >
                        <select className={statusClass} defaultValue={complaint.status} onChange={(e)=>this.changeHandler(e, complaint._id)}>
                        <option defaultValue="DEFAULT" disabled hidden >{complaint.status}</option>
                            <option value='Open'>Open</option>
                            <option value='In Progress'>In Progress</option>
                            <option value='Resolved'>Resolved</option>
                        </select>
                    </td>
                    <td><button onClick={this.updateStatus}>Update</button></td>
                </tr>
            )
        })

        return(
            <div className={styles.Resolve}>
                <h4>Your Complaints</h4>
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
                        {complaintsData}
                    </tbody>
                </table>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return{
        complaintsData: state.complaints.complaintsData
    };
};

const mapDispatchToProps = dispatch => {
    return{
        fetchComplaints: () => dispatch( actions.fetchComplaints() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( YourComplaints );
