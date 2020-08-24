import * as actionTypes from '../actions/actionTypes';
import { act } from 'react-dom/test-utils';

const initialState = {
    commentsData: {},
    repliesData: {}
};

const reducer = ( state = initialState, action ) => {
    switch( action.type ){
        case actionTypes.FETCH_COMMENTS_SUCCESS:
            
            state = {
                ...state,
                commentsData: {
                    ...state.commentsData,
                    [action.buzzID]: state.commentsData[action.buzzID]?[
                        ...state.commentsData[action.buzzID],
                        ...action.commentsData,
                        //action.commentsData.length===2?{message: ''}:{message: 'No more comments'}
                    ]: []
                }
            };
            //console.log(state.commentsData);
            return state;

        case actionTypes.FETCH_REPLIES_SUCCESS:
            
            state = {
                ...state,
                repliesData: {
                    ...state.repliesData,
                    [action.commentID]: action.repliesData
                }
            }
            return state;
        default:
            return state;
    }
}

export default reducer;
