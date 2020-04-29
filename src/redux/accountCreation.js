import * as ActionTypes from './ActionTypes';

export const accountCreation =(state={
    isLoading: false,
    err:null
},action) =>
{
    switch (action.type)
    {
        case ActionTypes.ACCOUNT_ERROR:
            return{
                ...state,
                isLoading: false,
                err:action.message
            };
        case ActionTypes.ACCOUNT_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.ACCOUNT_SUCCESS:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}