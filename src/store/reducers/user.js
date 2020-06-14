import * as actionTypes from '../actions/actionTypes';

const initialState = {
    name: '',
    email: '',
    valid: true,
    role: ''
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ){
        case actionTypes.FETCH_USER_SUCCESS:
            state = {
                ...state,
                name: action.user.name,
                email: action.user.email
            };
            console.log(state);
            return state;
        
        case actionTypes.FETCH_USER_FAILED:
            state = {
                ...state,
                valid: false
            };
            return state;
        
        case actionTypes.FETCH_USER_ROLE_SUCCESS:
            state = {
                ...state,
                role: action.userRole
            };
            return state;
        
        default:
            return state;
    }
}

export default reducer;