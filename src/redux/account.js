import * as ActionType from "./ActionTypes";

export const account =(state={
    holds:[],
    history:[],
    holdsLoading:false,
    historyLoading:false,
    errHolds:null,
    errHistory:null,
    details:null,
    detailLoading:false,
    errorDetail:null
},action) =>
{
    switch (action.type)
    {
        case ActionType.HOLDS_SUCCESS:
            return{
                ...state,
                holds: action.holds,
                holdsLoading: false
            };
        case ActionType.HOLDS_FAILURE:
            return {
                ...state,
                holdsLoading: false
            };
        case ActionType.HOLDS_REQUEST:
            return {
                ...state,
                holdsLoading: true
            };
        case ActionType.HISTORY_FAILURE:
            return {
                ...state,
                historyLoading: false,
                errHistory: action.message
            };
        case ActionType.HISTORY_REQUEST:
            return {
                ...state,
                historyLoading: true
            };
        case ActionType.HISTORY_SUCCESS:
            return {
                ...state,
                history: action.history,
                historyLoading: false
            };
        case ActionType.USER_FAILURE:
            return {
                ...state,
                errorDetail: action.message,
                detailLoading: false
            };
        case ActionType.USER_REQUEST:
        return {
            ...state,
            detailLoading: true
        };
        case ActionType.USER_SUCCESS:
        return {
            ...state,
            details: action.payload,
            detailLoading: false
        };
        default:
            return state;
    }
}