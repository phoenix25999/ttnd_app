import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchBuzzSuccess = ( buzzData ) => {
    return {
        type: actionTypes.FETCH_BUZZ_SUCCESS,
        buzzData: buzzData
    };
}

export const fetchBuzzFailed = ( ) => {
    return {
        type: actionTypes.FETCH_BUZZ_FAILED
    };
}

export const fetchBuzz = ( category ) => {
    console.log('initial buzz fetch');
    return dispatch => {
        axios.get(`http://localhost:5000/buzz?category=${category}`)
            .then(res=>{
                let buzzArray = [];
                for(let i in res.data){
                    buzzArray.push({
                        ...res.data[i]
                    });
                }
                dispatch(fetchBuzzSuccess(buzzArray))
            })
    }
}

export const fetchMoreBuzzSuccess = ( buzzData ) => {
    return {
        type: actionTypes.FETCH_MORE_BUZZ_SUCCESS,
        buzzData: buzzData
    };
}

export const fetchMoreBuzz = ( pageNo ) => {
    return dispatch => {
        axios.get( `http://localhost:5000/buzz?pageNo=${pageNo}` )
            .then(res=>{
                let buzzArray = [];
                for(let i in res.data){
                    buzzArray.push({
                        ...res.data[i]
                    });
                }
                console.log(buzzArray);
                dispatch(fetchMoreBuzzSuccess(buzzArray));
            });
    }
}

export const getBuzzCountByUserSuccess = ( buzzCount ) => {
    return{
        type: actionTypes.GET_BUZZ_COUNT_SUCCESS,
        buzzCount: buzzCount
    }
}

export const getBuzzCountByUser = ( userID ) => {
    return dispatch => {
        axios.get(`http://localhost:5000/buzzCount/${userID}`)
            .then(res=>{
                let buzzCount = res.data.count;
                dispatch(getBuzzCountByUserSuccess(buzzCount))
            });
    }
}
