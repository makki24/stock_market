import * as ActionTypes from './ActionTypes';

export const country =(state={
    isLoading: false,
    err:null,
    country:[]
},action) =>
{
    switch (action.type)
    {
        case ActionTypes.COUNTRY_FAILURE:
            return{
                ...state,
                isLoading: false,
                err:action.message
            };
        case ActionTypes.COUNTRY_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.COUNTRY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                country: action.payload
            };
        default:
            return state;
    }
}