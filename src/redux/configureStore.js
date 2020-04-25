import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {account} from "./account";
import {corporation} from "./corporation";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            account: account,
            corporation:corporation
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}