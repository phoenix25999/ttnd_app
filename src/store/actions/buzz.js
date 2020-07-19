import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchBuzzSuccess = ( buzzData ) => {
    return {
        type: actionTypes.FETCH_BUZZ_SUCCESS,
        buzzData: buzzData
    };
}

export const fetchBuzz = () => {
    return dispatch => {
        axios.get('http://localhost:5000/buzz')
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

export const fetchBuzzByUser = ( userID ) => {
    return dispatch => {
        axios.get(`http://localhost:5000/buzz/${userID}`)
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
