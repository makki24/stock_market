import * as ActionTypes from './ActionTypes';

export const shares =(state={
    isLoading: false,
    err:null,
    shares:[]
},action) =>
{
    switch (action.type)
    {
        case ActionTypes.SHARE_FAILURE:
            return{
                ...state,
                isLoading: false,
                err:action.message
            };
        case ActionTypes.SHARE_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.SHARE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                shares: action.payload
            };
        default:
            return state;
    }
}