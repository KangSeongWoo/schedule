/*
 Action 의 종류들을 선언합니다.
 앞에 export 를 붙임으로서, 나중에 이것들을 불러올 때,
 import * as types from './ActionTypes' 를 할 수 있어요.
*/

export const SET_USER_INFO      = 'SET_USER_INFO';
export const CLEAR_ALL_STATE    = "CLEAR_ALL_STATE";
export const OPEN_POPUP         = 'OPEN_POPUP';
export const CLOSE_POPUP        = 'CLOSE_POPUP';
export const SET_SCHEDULE       = 'SET_SCHEDULE';