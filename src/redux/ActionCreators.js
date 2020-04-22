import {baseUrl} from "../shared/baseUrl";
import * as ActionTypes from "./ActionTypes";

export const requestLogin =() =>
{
    return{
        type:ActionTypes.LOGIN_REQUEST
    }
}

export const receiveLogin =() =>
{
    return {
        type: ActionTypes.LOGIN_SUCCESS

    }
}

export const loginError =(err) =>
{
    return{
        type:ActionTypes.LOGIN_FAILURE,
        message:err.message
    }
}

export const loginUser =(creds) =>(dispatch) =>
{
    dispatch(requestLogin());

    return fetch(baseUrl+'users/login',
        {
            method:'POST',
            headers:
                {
                    'Content-Type':'application/json'
                },
            body: JSON.stringify(creds),
            credentials:'include'
        })
        .then(response =>
        {
            if(response.ok)
                return response;
            else
            {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw (error) ;
            }
        },err=> {throw (err)})
        .then(response => response.json())
        .then(response =>
        {
            console.log(response);
            if(response.success)
            {
                creds.isAuthenticated=true;
                localStorage.setItem('creds',JSON.stringify(creds));
                dispatch(receiveLogin());
            }
            else
            {
                var error = new Error('Error ' + response.err);
                error.response = response;
                throw error;
            }
        })
        .catch((err)=>
        {
            dispatch(loginError(err))
            alert(err);
        })
}

export const logoutRequest =() =>
{
    return {
        type:ActionTypes.LOGOUT_REQUEST,
    }
}

export const logoutSuccess =() =>
{
    return{
        type:ActionTypes.LOGOUT_SUCCESS
    }
}

export const logoutFailure = (err)=>
{
    return{
        type:ActionTypes.LOGOUT_FAILURE,
        message:err.message
    }
}
export const logoutUser =() =>(dispatch) =>
{
    dispatch(logoutRequest());

    return fetch(baseUrl+'users/logout',
        {
            method:'POST',
            credentials:'include'
        })
        .then((response) =>
        {
            if(response.ok)
                return response;
            else
            {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw (error) ;
            }
        },(error) =>{throw (error)})
        .then(response =>response.json())
        .then((response) =>
        {
            localStorage.removeItem('creds');
            dispatch(logoutSuccess());

            if(!response.success)
            {
                console.log(response);
                var error = new Error('Error ' + response.err);
                error.response = response;
                throw (error);
            }
        })
        .catch((err) =>
        {
            alert(err);
            dispatch(logoutFailure(err));
        })

}