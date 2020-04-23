import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {account} from "./account";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            account: account,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}