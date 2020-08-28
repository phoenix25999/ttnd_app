import * as actionTypes from '../actions/actionTypes';

const initialState = {
    commentsData: {},
    repliesData: {},
    commentsMessage: {}
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ){
        case actionTypes.FETCH_COMMENTS_SUCCESS:
            
            state = {
                ...state,
                commentsData: {
                    ...state.commentsData,
                    [action.buzzID]: action.commentsData
                },
                commentsMessage: {
                    [action.buzzID]: ''
                }
            };
            return state;
        
        case actionTypes.FETCH_MORE_COMMENTS_SUCCESS:

            if(action.commentsData.length===2){
            
                state = {
                    ...state,
                    commentsData: {
                        ...state.commentsData,
                        [action.buzzID]: [
                            ...state.commentsData[action.buzzID],
                            ...action.commentsData
                        ]
                    },
                    commentsMessage: {
                        ...state.commentsMessage,
                        [action.buzzID]: ''
                    }
                };
            }

            else if(action.commentsData.length===1){
                state = {
                    ...state,
                    commentsData: {
                        ...state.commentsData,
                        [action.buzzID]: [
                            ...state.commentsData[action.buzzID],
                            ...action.commentsData
                        ]
                    },
                    commentsMessage: {
                        ...state.commentsMessage,
                        [action.buzzID]: 'No more comments'
                    }
                };
            }

            else{
                state = {
                    ...state,
                    commentsMessage: {
                        ...state.commentsMessage,
                        [action.buzzID]: 'No more comments'
                    }
                };
            }
            console.log(state);
            return state;

        case actionTypes.FETCH_REPLIES_SUCCESS:
            
            state = {
                ...state,
                repliesData: {
                    ...state.repliesData,
                    [action.commentID]: action.repliesData
                }
            }
            return state;
        default:
            return state;
    }
}

export default reducer;
