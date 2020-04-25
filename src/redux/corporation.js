import * as ActionTypes from './ActionTypes';

export const corporation =(state={
    isLoading: false,
    err:null,
    company:[]
},action) =>
{
    switch (action.type)
    {
        case ActionTypes.CORP_FAILURE:
            return{
                ...state,
                isLoading: false,
                err:action.message
            };
        case ActionTypes.CORP_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.CORP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                company: action.payload
            };
        default:
            return state;
    }
}