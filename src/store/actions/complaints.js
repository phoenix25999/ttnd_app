import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchComplaintsSuccess = ( complaintsData ) => {
    return{
        type: actionTypes.FETCH_COMPLAINTS_SUCCESS,
        complaintsData: complaintsData
    };
};



export const fetchComplaints = () => {
    return dispatch => {
        axios.get('http://localhost:5000/complaint')
            .then(res=>{
                let complaintsArray = [];
                for(let i in res.data){
                    complaintsArray.push({
                        ...res.data[i]
                    })
                }
                dispatch( fetchComplaintsSuccess(complaintsArray) )
            });
    }
}

export const fetchComplaintsByUserSuccess = ( complaintsData ) => {
    return{
        type: actionTypes.FETCH_COMPLAINTS_BYUSER_SUCCESS,
        complaintsData: complaintsData
    };
};


export const fetchComplaintsByUser = (email) => {
    return dispatch => {
        console.log(email);
        axios.get(`http://localhost:5000/complaint/${email}`)
            .then(res=>{
                let complaintsArray = [];
                for(let i in res.data){
                    complaintsArray.push({
                        ...res.data[i]
                    })
                }
                dispatch( fetchComplaintsByUserSuccess(complaintsArray) )
            });
    }
}