import * as actionTypes from '../actions/actionTypes';

const initialState = {
    commentsData: []
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ){
        case actionTypes.FETCH_COMMENTS_SUCCESS:
            state = {
                ...state,
                commentsData: [...action.commentsData]
            };
            console.log(state);
            return state;
        default:
            return state;
    }
}

export default reducer;