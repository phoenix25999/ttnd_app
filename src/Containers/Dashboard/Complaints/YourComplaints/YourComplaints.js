import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isSuperAdmin } from '../../../../Utility/checkUserRole';
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import * as actions from '../../../../store/actions/index';
import styles from './YourComplaints.module.css';
import Assign from '../Assign/Assign';
import ShowComplaints from '../ShowComplaints/ShowComplaints';
import Toaster from '../../../../Utility/Toaster/Toaster';

class YourComplaints extends Component{

    state={
        showComplaintDetails: false,
        showToaster: false,
        sortBy: '',
        pageNo: 1   
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

    applySorting = ( fetchByUser, sortingCriteria ) => {
        fetchByUser?
        this.props.fetchComplaintsByUser(this.props.email, '', sortingCriteria)
        :
        this.props.fetchAllComplaints('', sortingCriteria);
        this.setState({showToaster: true});
        setTimeout(
            ()=>{
                this.setState({showToaster: false});
            }
        , 2000);
    }

    applyFilter = (event, fetchByUser) => {
        fetchByUser?
        this.props.fetchComplaintsByUser(this.props.email, event.target.value, '')
        :
        this.props.fetchAllComplaints( event.target.value, '' );
        this.setState({showToaster: true});
        setTimeout(
            ()=>{
                this.setState({showToaster: false});
            }
        , 2000);
    }

    loadMoreComplaints = (  ) => {
        this.setState({pageNo: this.state.pageNo+1});
        setTimeout(()=>this.props.fetchMoreComplaints('','', this.state.pageNo),0);
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
                    <td>{complaint.createdOn.slice(0,10)}</td>
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
                    <td>{complaint.createdOn.slice(0,10)}</td>
                </tr>
            )
        })
        }

        return(
            <>
            {this.state.showToaster?<Toaster message='Success!'/>:''}
            <div className={styles.YourComplaints}>
                <div>
                    <h4>Your Complaints</h4>
                    <div>
                        <select onChange={(e)=>this.applyFilter(e,true)}>
                            <option value=''>Department</option>
                            <option value='Hardware' >Hardware</option>
                            <option value='Infra'>Infra</option>
                            <option value='Other'>Other</option>
                        </select>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Department</th>
                            <th>Issue ID</th>
                            <th>Assigned To</th>
                            <th>Status</th>
                            <th className={styles.CreatedOn}>
                                Created On
                                <span> 
                                <button title='New to Old' onClick={()=>this.applySorting(true, -1)}><FaArrowUp/></button> 
                                <button title='Old to New' onClick={()=>this.applySorting(true, 1)}><FaArrowDown /></button>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaintsData}
                    </tbody>
                </table>
                
            </div>
            <button onClick={()=>this.setState({pageNo: this.state.pageNo-1})}><FaArrowLeft /></button>
            <button onClick={()=>this.loadMoreComplaints}><FaArrowRight /></button>
            {
                isSuperAdmin(this.props.role)?
                <div className={styles.YourComplaints}>
                <div>
                    <h4>All Complaints</h4>
                    <div>
                        <select onChange={(e)=>this.applyFilter(e,false)}>
                            <option value=''>Department</option>
                            <option value='Hardware' >Hardware</option>
                            <option value='Infra'>Infra</option>
                            <option value='Other'>Other</option>
                        </select>
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
                            <th className={styles.CreatedOn}>
                                Created On
                                <span> 
                                <button title='New to Old' onClick={()=>this.applySorting(false, -1)}><FaArrowUp/></button> 
                                <button title='Old to New' onClick={()=>this.applySorting(false,1)}><FaArrowDown /></button>
                                </span>
                            </th>
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
        fetchAllComplaints: ( department, sortBy ) => dispatch( actions.fetchComplaints( department, sortBy ) ),
        fetchMoreComplaints: ( department, sortBy, pageNo ) => dispatch( actions.fetchMoreComplaints( department, sortBy, pageNo ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( YourComplaints );