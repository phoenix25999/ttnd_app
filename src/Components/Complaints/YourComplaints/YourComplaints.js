import React, { Component } from 'react';
import axios from 'axios';
import styles from './YourComplaints.module.css';

class YourComplaints extends Component{

    state = {
        complaints: []
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

    render(){

        let complaintsData = this.state.complaints.map(complaint=> {
            let statusClass = this.checkStatus(complaint.status)
            return(
                <tr key={complaint.id}>
                    <td>{complaint.department} </td>
                    <td style={{textDecoration:'underline', color:'#0000ff'}}>{complaint.id}</td>
                    <td>Ashish Mishra</td>
                    <td className={statusClass}>{complaint.status}</td>
                </tr>
            )
        })

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

export default YourComplaints;