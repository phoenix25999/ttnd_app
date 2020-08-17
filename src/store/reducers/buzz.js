import * as actionTypes from '../actions/actionTypes';

const initialState = {
    buzzData: [],
    buzzCount: 0
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ){
        case actionTypes.FETCH_BUZZ_SUCCESS:
            state = {
                ...state,
                buzzData: [...action.buzzData]
            };
            console.log(state);
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

