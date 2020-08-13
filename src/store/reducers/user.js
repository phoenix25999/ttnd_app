import * as actionTypes from '../actions/actionTypes';

const initialState = {
    userData:{},
    allUsersData: [],
    adminsData: [],
    valid: true
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ){
        case actionTypes.FETCH_USER_SUCCESS:
            state = {
                ...state,
                userData:{...action.user}
            };
            return state;

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state = {
                ...state,
                allUsersData:[...action.users]
            };
        return state;
        
        case actionTypes.FETCH_USER_FAILED:
            state = {
                ...state,
                valid: false
            };
            return state;

        case actionTypes.FETCH_ADMINS_SUCCESS:
            state = {
                ...state,
                adminsData: [...action.admins]
            };
            return state;
    
        default:
            return state;
    }
}

export default reducer;