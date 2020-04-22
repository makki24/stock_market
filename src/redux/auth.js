import * as ActionTypes from "./ActionTypes";

export const Auth =(state =
    {
        isLoading:false,
        isAuthenticated:localStorage.getItem('creds')? true:false,
        errMess:null,
        creds: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null
    },action) =>
{
    switch (action.type)
    {
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                errMess: '',
                creds:JSON.parse(localStorage.getItem('creds'))
            };
        case ActionTypes.LOGIN_REQUEST:
            return {
                ...state,
                isAuthenticated: false,
                isLoading: true
            };
        case ActionTypes.LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: true
            };
        case ActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                errMess: action.message
            };
        case ActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false
            };
        case ActionTypes.LOGOUT_FAILURE:
            return {
                ...state,
                isLoading: false,
                errMess: action.message
            }
        default:
            return state
    }
}