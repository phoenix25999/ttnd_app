import * as actionTypes from '../actions/actionTypes';

const initialState = {
    commentsData: {},
    repliesData: {}
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ){
        case actionTypes.FETCH_COMMENTS_SUCCESS:
            
            state = {
                ...state,
                commentsData: {
                    ...state.commentsData,
                    [action.buzzID]: action.commentsData
                }
            };
            return state;

        case actionTypes.FETCH_REPLIES_SUCCESS:
            
            state = {
                ...state,
                repliesData: {
                    ...state.repliesData,
                    [action.commentID]: action.repliesData
                }
            };
            console.log(state);
            return state;
        default:
            return state;
    }
}

export default reducer;
