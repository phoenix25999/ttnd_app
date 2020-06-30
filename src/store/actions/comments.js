import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchCommentsSuccess = ( commentsData ) => {
    return {
        type: actionTypes.FETCH_COMMENTS_SUCCESS,
        commentsData: commentsData
    };
}

export const fetchComments = ( buzzID ) => {
    return dispatch => {
        axios.get('http://localhost:5000/comment/'+buzzID)
            .then(res=>{
                let commentsArray = [];
                console.log(res.data);
                for(let i in res.data){
                    commentsArray.push({
                        ...res.data[i]
                    });
                }
                dispatch(fetchCommentsSuccess(commentsArray))
            })
    }
}
