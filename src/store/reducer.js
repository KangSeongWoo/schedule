import * as types from './actionType';
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
  };
// 초기 상태를 정의합니다.
const initialState = {
    admin: {
        
    }
}

export const reduxState = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_ADMIN_USER_INFO:
            localStorage.setItem("token", action.params.token)
            return {
                ...state,
                admin : {
                    ...state.admin,
                    ...action.params.user_info,
                    token : action.params.token,
                }
            }
        case types.SET_STORE_LIST:
            return {
                ...state,
                admin : {
                    ...state.admin,
                    stores : action.params,
                }
            }
        case types.SET_STORE_INFO:
            return {
                ...state,
                admin : {
                    ...state.admin,
                    storeinfo : action.params,
                }
            }
        case types.SET_STORE:
            return {
                ...state,
                admin : {
                    ...state.admin,
                    selectedStore : action.params,
                }
            }
        case types.CLEAR_ALL_STATE:
            return {
                admin: {}
            }
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    reduxState
});

export default persistReducer(persistConfig, rootReducer);