import * as actionTypes from '../actions/actionTypes';

const initialState = {
    buzzData: [],
    error: false,
    buzzCount: 0
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ){
        case actionTypes.FETCH_BUZZ_SUCCESS:
            state = {
                ...state,
                buzzData: [...action.buzzData]
            };
            return state;
        
        case actionTypes.FETCH_BUZZ_FAILED:
            state = {
                ...state,
                error: true
            };
            return state;

        case actionTypes.GET_BUZZ_COUNT_SUCCESS:
            state = {
                ...state,
                buzzCount: action.buzzCount
            };
            return state;

        default:
            return state;
    }
}

export default reducer;

