import * as actionTypes from '../actions/actionTypes';

const initialState = {
    name: '',
    email: '',
    role: '',
    picture: '',
    about: '',
    valid: true
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ){
        case actionTypes.FETCH_USER_SUCCESS:
            state = {
                ...state,
                name: action.user.name,
                email: action.user.email,
                role: action.user.role,
                picture: action.user.picture,
                about: action.user.about
            };
            return state;
        
        case actionTypes.FETCH_USER_FAILED:
            state = {
                ...state,
                valid: false
            };
            return state;
    
        default:
            return state;
    }
}

export default reducer;