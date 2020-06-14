import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchUserSuccess = ( user ) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        user: user
    };
}

export const fetchUserFailed = () => {
    return {
        type: actionTypes.FETCH_USER_FAILED,
    };
}

export const fetchUser = ( token ) => {
    return dispatch => {
        axios.get('http://localhost:5000', {
            headers: {'authorization': `bearer ${token}`}
        })
            .then(res=>{
                if(res.data.status===false){
                    dispatch(fetchUserFailed());
                }
                else{
                dispatch(fetchUserSuccess(res.data));
            }
            })
    }
}

export const fetchUserRoleSuccess = ( userRole ) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        userRole: userRole
    };
}

export const fetchUserRole = (email) => {
    return dispatch => {
        axios.get('http://localhost:5000/user/role/' + email)
            .then(res=>{
                dispatch(fetchUserRoleSuccess(res.data[0].role));
            });
    }
}