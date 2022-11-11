/*
    action 객체를 만드는 액션 생성자들을 선언합니다. (action creators)
    여기서 () => ({}) 은, function() { return { } } 와 동일한 의미입니다.
    scope 이슈와 관계 없이 편의상 사용되었습니다.
*/

import * as types from './actionType'

export const setAdminUserInfo = params => ({
    type: types.SET_ADMIN_USER_INFO,
    params
})

export const clearAllState = () => ({
    type : types.CLEAR_ALL_STATE
})

export const setStoreList = (params) => ({
    type : types.SET_STORE_LIST,
    params
})

export const setStoreInfo = (params) => ({
    type : types.SET_STORE_INFO,
    params
})

export const setStore = (params) => ({
    type : types.SET_STORE,
    params
})