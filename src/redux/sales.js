import * as ActionTypes from './ActionTypes';

export const sale =(state={
    isLoading: false,
    err:null
},action) =>
{
    switch (action.type)
    {
        case ActionTypes.SALE_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.SALE_SUCCESS:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}