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
                console.log(res.data);
                if(res.data.status===false){
                    dispatch(fetchUserFailed());
                }
                else{
                    axios.get('http://localhost:5000/user/' + res.data.email)
                        .then(response=>{
                        let userData = {
                            ...response.data[0]
                        }
                        dispatch(fetchUserSuccess(userData));
            });
                    
                dispatch(fetchUserSuccess(res.data));
            }
            })
    }
}

export const fetchAllUsersSuccess = ( users ) => {
    return {
        type: actionTypes.FETCH_ALL_USERS_SUCCESS,
        users: users
    };
}

export const fetchAllUsersFailed = (  ) => {
    return {
        type: actionTypes.FETCH_ALL_USERS_FAILED
    };
}

export const fetchAllUsers = ( userID ) => {
    return dispatch => {
        axios.get(`http://localhost:5000/users/${userID}`)
            .then(response=>{
                let usersArray = [];
                for(let i in response.data){
                    usersArray.push({...response.data[i]});
                }
                console.log(response.data)
                
                dispatch(fetchAllUsersSuccess(usersArray));
            })
            .catch(err=>dispatch(fetchAllUsersFailed()))
    }
}

export const fetchAdminsSuccess = ( admins ) => {
    return {
        type: actionTypes.FETCH_ADMINS_SUCCESS,
        admins: admins
    };
}

export const fetchAdmins = ( department ) => {
    console.log('here');
    return dispatch => {
        axios.get(`http://localhost:5000/admins/${department}`)
            .then(response=>{
                let adminsArray = [];
                for(let i in response.data){
                    adminsArray.push({...response.data[i]});
                }
                
                dispatch(fetchAdminsSuccess(adminsArray));
            })
    }
}
