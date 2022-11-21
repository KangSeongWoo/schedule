import * as types from './actionType';
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { startTransition } from 'react';

const persistConfig = {
    key: "root",
    storage,
  };
// 초기 상태를 정의합니다.
const initialState = {
    user: {
        
    },
    popup: {
        flag : false,
        title : '',
        message : '',
        callbackFunction : null
    }
}

export const reduxState = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER_INFO:
            return {
                ...state,
                user : {
                    ...state.user,
                    ...action.params,
                }
            }
        case types.OPEN_POPUP: 
            return {
                popup: {
                    flag : true,
                    title : action.params.title,
                    message : action.params.message,
                    callbackFunction : action.params.callbackFunction
                }
            }
        case types.CLOSE_POPUP: 
            return {
                popup: {
                    flag : false,
                    title : '',
                    message : '',
                    callbackFunction : null
                }
            }
        case types.CLEAR_ALL_STATE:
            return {
                user: {}
            }
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    reduxState
});

export default persistReducer(persistConfig, rootReducer);