import * as actionTypes from '../actions/actionTypes';

const initialState = {
    complaintsData: [],
    allComplaintsData: [],
    assignedComplaints: []
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ){
        case actionTypes.FETCH_COMPLAINTS_BYUSER_SUCCESS:
            state = {
                ...state,
                complaintsData: [...action.complaintsData]
            };
            return state;
        case actionTypes.FETCH_COMPLAINTS_SUCCESS:
            state={
                ...state,
                allComplaintsData: [...action.complaintsData]
            };
            return state;
        case actionTypes.FETCH_MORE_COMPLAINTS_SUCCESS:
            state={
                ...state,
                allComplaintsData: [...action.complaintsData]
            }
            return state;
        case actionTypes.FETCH_ASSIGNED_COMPLAINTS_SUCCESS:
            state={
                ...state,
                assignedComplaints: [...action.complaintsData]
            };
            return state;
        default:
            return state;
    }
}

export default reducer;