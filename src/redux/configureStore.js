import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {account} from "./account";
import {corporation} from "./corporation";
import {shares} from "./shares";
import {myShares} from "./myShares";
import {sale} from "./sales";
import {createForms} from "react-redux-form";
import {CreateAccount} from "./forms";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            account: account,
            corporation:corporation,
            shares:shares,
            myShares:myShares,
            sale:sale,
            ...createForms({
                createaccount: CreateAccount
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}