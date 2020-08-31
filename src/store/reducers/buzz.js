import * as actionTypes from '../actions/actionTypes';

const initialState = {
    buzzData: [],
    error: false,
    buzzCount: 0,
    message: ''
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ){
        case actionTypes.FETCH_BUZZ_SUCCESS:
            state = {
                ...state,
                buzzData: [
                    ...action.buzzData
                ]
            }
            return state;

        case actionTypes.FETCH_MORE_BUZZ_SUCCESS:
            if(action.buzzData.length===3){
                state = {
                    ...state,
                    buzzData: [
                        ...state.buzzData,
                        ...action.buzzData
                    ]
                }
            }
            else if(action.buzzData.length===0){
                state={
                    ...state,
                    message: 'No more buzz!'
                }
            }
            else{
                state = {
                    ...state,
                    buzzData: [
                        ...state.buzzData,
                        ...action.buzzData
                    ],
                    message: 'No more buzz!'
                }
            }
            
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

