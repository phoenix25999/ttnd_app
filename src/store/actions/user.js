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
                    
                    axios.get('http://localhost:5000/user/role/' + res.data.email)
                        .then(response=>{
                        let userData = {
                            ...res.data,
                            ...response.data[0]
                        }
                        dispatch(fetchUserSuccess(userData));
            });
                    
                dispatch(fetchUserSuccess(res.data));
            }
            })
    }
}
