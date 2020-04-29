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
                dispatch(fetchAccount());
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

export const holdsSuccess =(holds) =>
{
    return{
        type:ActionTypes.HOLDS_SUCCESS,
        holds:holds
    }
}

export const holdsRequest =() =>
{
    return{
        type:ActionTypes.HOLDS_REQUEST
    }
}

export const historyRequest =() =>
{
    return{
        type:ActionTypes.HISTORY_REQUEST
    }
}

export const holdsError= (err) =>
{
    return{
        type:ActionTypes.HOLDS_FAILURE,
        message:err.message
    }
}

export const historySuccess =(history) =>
{
    return{
        type:ActionTypes.HISTORY_SUCCESS,
        history:history
    }
}

export const historyError= (err) =>
{
    return{
        type:ActionTypes.HISTORY_FAILURE,
        message:err.message
    }
}

export const fetchAccount =() => (dispatch) =>
{
    dispatch(fetchHolds());
    dispatch(fetchHistory());
    dispatch(fetchUser());
    return;
}

export const fetchHistory=() => (dispatch) =>
{
    dispatch(historyRequest());
    return fetch(baseUrl+'users/trades/history',
        {
            method:'GET',
            credentials:'include'
        })
        .then((response) =>
        {
            if(response.ok)
            {
                return response;
            }
            else
            {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw (error) ;
            }
        },(err) =>{throw (err)})
        .then(response=>response.json())
        .then((response) =>
        {
            dispatch(historySuccess(response));
        })
        .catch((err) =>
        {
            dispatch(historyError(err));
        })

}
export const fetchHolds =() =>(dispatch) =>
{
    dispatch(holdsRequest());
    return fetch(baseUrl+'users/trades/holds',
        {
            method:'GET',
            credentials:'include'
        })
        .then((response) =>
        {
            if(response.ok)
            {
                return response;
            }
            else
            {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw (error) ;
            }
        },(err) =>{ throw (err)})
        .then(response => response.json())
        .then((response) =>
        {
            dispatch(holdsSuccess(response));
        })
        .catch((err) =>{alert(err);dispatch(holdsError(err))})
}

export const userRequest =() =>
{
    return{
        type:ActionTypes.USER_REQUEST
    }
};

export const userFailure =(err) =>
{
    return{
        type:ActionTypes.USER_FAILURE,
        message:err.message
    }
};

export const userSuccess =(data)=>
{
    return{
        type:ActionTypes.USER_SUCCESS,
        payload:data
    }
};
export const fetchUser =() =>(dispatch) =>
{
    dispatch(userRequest());

    return fetch(baseUrl+'users/details',
        {
            method:'GET',
            credentials:'include'
        })
        .then((response) =>
        {
            if(response.ok)
            {
                return response;
            }
            else
            {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw (error) ;
            }
        },(err) =>{throw (err)})
        .then(response =>response.json())
        .then((response) =>
        {
            dispatch(userSuccess(response));
        })
        .catch((err) =>{dispatch(userFailure(err))})
};

export const fetchObjects =() =>(dispatch) =>
{
    dispatch(fetchCorporation());
    dispatch(fetchShares());
};

export const fetchCorporation =() =>(dispatch) =>
{
    dispatch(corpLoading());

    return fetch(baseUrl+'corporation')
        .then((response) =>
        {
            if(response.ok)
            {
                return response;
            }
            else
            {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw (error) ;
            }
        },(err) =>{throw (err)})
        .then(response =>response.json())
        .then((response) =>
        {
            dispatch(corpSuccess(response));
        })
        .catch((err) =>{dispatch(corpFailure(err))})
};

export const corpLoading =()=>
{
    return{
        type:ActionTypes.CORP_LOADING
    }
}

export const corpSuccess =(response) =>
{
    return{
        type:ActionTypes.CORP_SUCCESS,
        payload:response
    }
};

export const corpFailure =(err) =>
{
    return{
        type:ActionTypes.CORP_FAILURE,
        message:err.message
    }
};

export const fetchShares =() => (dispatch)=>
{
    dispatch(shareLoading());

    return fetch(baseUrl+'shares')
        .then((response) =>
        {
            if(response.ok)
            {
                return response;
            }
            else
            {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw (error) ;
            }
        },(err) =>{throw (err)})
        .then(response =>response.json())
        .then((response) =>
        {
            dispatch(shareSuccess(response));
        })
        .catch((err) =>{dispatch(shareFailure(err))})
};

export const shareLoading=()=>
{
    return{
        type:ActionTypes.SHARE_LOADING
    }
};

export const shareFailure =(err) =>
{
    return{
        type:ActionTypes.SHARE_FAILURE,
        message:err.message
    }
};

export const shareSuccess =(res) =>
{
    return{
        type:ActionTypes.SHARE_SUCCESS,
        payload:res
    }
};


export const buyShare =(data) =>(dispatch) =>
{
    dispatch(myShareLoading());
    return fetch(baseUrl+'users/trades',
        {
            method:'POST',
            headers:
                {
                    'Content-Type':'application/json'
                },
            body: JSON.stringify(data),
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
            if(response.success)
            {
                dispatch(fetchShares());
                dispatch(fetchAccount());
                dispatch(myShareSuccess());
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
            alert(err);
            dispatch(myShareFailed(err));
        })
}

export const myShareFailed =(err) =>
{
    return{
        type:ActionTypes.MYSHARE_FAILURE,
        err:err.message
    }
}

export const myShareLoading =() =>
{
    return{
        type:ActionTypes.MYSHARE_LOADING
    }
}

export const myShareSuccess=() =>
{
    return{
        type:ActionTypes.MYSHARE_SUCCESS
    }
}

export const sellLoading= () =>
{
    return{
        type:ActionTypes.SALE_LOADING
    }
}

export const sellSuccess =() =>
{
    return{
        type:ActionTypes.SALE_SUCCESS
    }
}

export const sellShare =(data) =>(dispatch) =>
{
    dispatch(sellLoading());

    console.log("from actions",data);
    return fetch(baseUrl+'users/trades',
        {
            method:'DELETE',
            credentials:'include',
            headers:
                {
                    'Content-Type':'application/json'
                },
            body: JSON.stringify(data),
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
            if(response.success)
            {
                dispatch(fetchShares());
                dispatch(fetchAccount());
                dispatch(sellSuccess());
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
            alert(err);
            dispatch(sellSuccess(err));
        })
}

export const accountLoading =() =>
{
    return{
        type:ActionTypes.ACCOUNT_LOADING
    }
};

export const accountFailed=(err) =>
{
    return{
        type:ActionTypes.ACCOUNT_ERROR,
        message:err.message
    }
};

export const accountSuccess=() =>
{
    return{
        type:ActionTypes.ACCOUNT_SUCCESS
    }
}

export const createAccount= (data) =>(dispatch) =>
{
    dispatch(accountLoading());

    return fetch(baseUrl+'users/signup',
        {
            method:'POST',
             headers:
                {
                    'Content-Type':'application/json'
                },
            body: JSON.stringify(data),
        })
}