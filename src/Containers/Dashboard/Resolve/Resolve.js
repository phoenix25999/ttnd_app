import React, { Component } from 'react';
import axios from 'axios';
import styles from './Resolve.module.css';

class YourComplaints extends Component{

    state = {
        complaints: [],
        updateStatus: {}
    }

    componentDidMount(){
        axios.get('http://localhost:5000/complaint')
            .then(res=>{
                let complaintsArray = [];
                for(let i in res.data){
                    complaintsArray.push({
                        id: res.data[i]._id,
                        department: res.data[i].department,
                        status: res.data[i].status
                    });
                }
                this.setState({complaints: complaintsArray});
            })
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
        axios.post('http://localhost:5000/complaint/updateStatus', this.state.updateStatus)
            .then(res=>console.log(res));
    }

    render(){

        let complaintsData = this.state.complaints.map(complaint=> {
            let statusClass = this.checkStatus(complaint.status)
            return(
                <tr key={complaint.id}>
                    <td>{complaint.department} </td>
                    <td style={{textDecoration:'underline', color:'#0000ff'}}>{complaint.id}</td>
                    <td>Ashish Mishra</td>
                    <td >
                        <select className={statusClass} defaultValue={complaint.status} onChange={(e)=>this.changeHandler(e, complaint.id)}>
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

export default YourComplaints;