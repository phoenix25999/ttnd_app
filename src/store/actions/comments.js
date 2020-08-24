import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchCommentsSuccess = ( commentsData, buzzID ) => {
    return {
        type: actionTypes.FETCH_COMMENTS_SUCCESS,
        commentsData: commentsData,
        buzzID: buzzID
    };
}

export const fetchComments = ( buzzID ) => {
    return dispatch => {
        axios.get('http://localhost:5000/comment/'+buzzID)
            .then(res=>{
                let commentsArray = [];
                for(let i in res.data){
                    commentsArray.push({
                        ...res.data[i]
                    });
                }
                dispatch(fetchCommentsSuccess(commentsArray, buzzID))
            });
    }
}

export const fetchMoreComments = ( buzzID, pageNo ) => {
    return dispatch => {
        axios.get(`http://localhost:5000/comment/${buzzID}?pageNo=${pageNo}`)
            .then(res=>{
                let commentsArray = [];
                for(let i in res.data){
                    commentsArray.push({
                        ...res.data[i]
                    });
                }
                dispatch(fetchCommentsSuccess(commentsArray, buzzID))
            });
    }
}

export const fetchRepliesSuccess = ( repliesData, commentID ) => {
    return {
        type: actionTypes.FETCH_REPLIES_SUCCESS,
        repliesData: repliesData,
        commentID: commentID
    };
}



export const fetchReplies = ( commentID ) => {
    return dispatch => {
        axios.get(`http://localhost:5000/commentReply/${commentID}`)
            .then(res=>{
                console.log(res.data);
                let repliesArray = [];
                for(let i in res.data){
                    repliesArray.push({
                        ...res.data[i]
                    });
                }
                dispatch(fetchRepliesSuccess(repliesArray, commentID));
            });
    }
}

