import * as actionTypes from '../actions/actionTypes';

const initialState = {
    complaintsData: []
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ){
        case actionTypes.FETCH_COMPLAINTS_SUCCESS:
            state = {
                ...state,
                complaintsData: [...action.complaintsData]
            };
            return state;
        default:
            return state;
    }
}

export default reducer;