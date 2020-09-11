import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchComplaintsSuccess = ( complaintsData ) => {
    return{
        type: actionTypes.FETCH_COMPLAINTS_SUCCESS,
        complaintsData: complaintsData
    };
};



export const fetchComplaints = ( department, sortBy, pageNo ) => {
    return dispatch => {
        axios.get(`http://localhost:5000/complaint?department=${department}&sortBy=${sortBy}&pageNo=${pageNo}`)
            .then(res=>{
                let complaintsArray = [];
                for(let i in res.data){
                    complaintsArray.push({
                        ...res.data[i]
                    })
                }
                dispatch( fetchComplaintsSuccess(complaintsArray) );
            });
    }
}

export const fetchMoreComplaintsSuccess = ( complaintsData ) => {
    return{
        type: actionTypes.FETCH_MORE_COMPLAINTS_SUCCESS,
        complaintsData: complaintsData
    }
}

export const fetchMoreComplaints = ( department, sortBy, pageNo ) => {
    return dispatch => {
        axios.get(`http://localhost:5000/complaint?department=${department}&sortBy=${sortBy}&pageNo=${pageNo}`)
        .then(res=>{
            let complaintsArray = [];
            for(let i in res.data){
                complaintsArray.push({
                    ...res.data[i]
                })
            }
            dispatch( fetchMoreComplaintsSuccess(complaintsArray) );
        });
    }
}

export const fetchComplaintsByUserSuccess = ( complaintsData ) => {
    return{
        type: actionTypes.FETCH_COMPLAINTS_BYUSER_SUCCESS,
        complaintsData: complaintsData
    };
};


export const fetchComplaintsByUser = (email, category, sortBy) => {
    return dispatch => {
        axios.get(`http://localhost:5000/complaint/${email}?category=${category}&sortBy=${sortBy}`)
            .then(res=>{
                let complaintsArray = [];
                for(let i in res.data){
                    complaintsArray.push({
                        ...res.data[i]
                    })
                }
                dispatch( fetchComplaintsByUserSuccess(complaintsArray) )
            });
    };
};

export const fetchMoreComplaintsByUserSuccess = ( complaintsData ) => {
    return{
        type: actionTypes.FETCH_MORE_COMPLAINTS_BYUSER_SUCCESS,
        complaintsData: complaintsData
    };
};

export const fetchMoreComplaintsByUser = (email, category, sortBy, pageNo) => {
    return dispatch => {
        axios.get(`http://localhost:5000/complaint/${email}?category=${category}&sortBy=${sortBy}&pageNo=${pageNo}`)
            .then(res=>{
                let complaintsArray = [];
                for(let i in res.data){
                    complaintsArray.push({
                        ...res.data[i]
                    })
                }
                dispatch( fetchMoreComplaintsByUserSuccess(complaintsArray) )
            });
    };
};

export const fetchAssignedComplaintsSuccess = ( complaintsData ) => {
    return{
        type: actionTypes.FETCH_ASSIGNED_COMPLAINTS_SUCCESS,
        complaintsData: complaintsData
    };
};

export const fetchAssignedComplaints = ( admin ) => {
    return dispatch => {
        axios.get(`http://localhost:5000/complaint/assigned/${admin}`)
            .then(res=>{
                let complaintsArray = [];
                for(let i in res.data){
                    complaintsArray.push({
                        ...res.data[i]
                    })
                }
                dispatch( fetchAssignedComplaintsSuccess(complaintsArray) )
            });
    }
}