import * as ActionTypes from './ActionTypes';

export const myShares =(state={
    isLoading: false,
    err:null
},action) =>
{
    switch (action.type)
    {
        case ActionTypes.MYSHARE_FAILURE:
            return{
                ...state,
                isLoading: false,
                err:action.message
            };
        case ActionTypes.MYSHARE_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.MYSHARE_SUCCESS:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}