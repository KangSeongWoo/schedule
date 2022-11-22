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
    schedule : {

    },
    popup: {
        type : '',
        flag : false,
        title : '',
        message : '',
        callbackFunction : null,
        cancelFunction : null,
        okButton : '',
        cancelButton : ''
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
        case types.SET_SCHEDULE:
            return {
                ...state,
                schedule : {
                    ...state.schedule,
                    ...action.params,
                },
            }
        case types.OPEN_POPUP: 
            return {
                ...state,
                popup: {
                    type : action.params.type,
                    flag : true,
                    title : action.params.title,
                    message : action.params.message,
                    callbackFunction : action.params.callbackFunction,
                    cancelFunction : action.params.cancelFunction,
                    okButton : action.params.okButton,
                    cancelButton : action.params.cancelButton
                }
            }
        case types.CLOSE_POPUP: 
            return {
                ...state,
                popup: {
                    type : '',
                    flag : false,
                    title : '',
                    message : '',
                    callbackFunction : null,
                    cancelFunction : null,
                    okButton : '',
                    cancelButton : ''
                }
            }
        case types.CLEAR_ALL_STATE:
            return {
                user: {},
                schedule : {},
                popup: {
                    flag : false,
                    title : '',
                    message : '',
                    callbackFunction : null
                }
            }
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    reduxState
});

export default persistReducer(persistConfig, rootReducer);