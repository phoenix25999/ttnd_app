import * as actionTypes from '../actions/actionTypes';

const initialState = {
    buzzData: []
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ){
        case actionTypes.FETCH_BUZZ_SUCCESS:
            state = {
                ...state,
                buzzData: [...action.buzzData]
            };
            return state;
        default:
            return state;
    }
}

export default reducer;

