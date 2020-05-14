import * as ActionTypes from './ActionTypes';

export const market =(state={
    isLoading: false,
    err:null,
    market:[]
},action) =>
{
    switch (action.type)
    {
        case ActionTypes.MARK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                market: action.payload
            };
        default:
            return state;
    }
}