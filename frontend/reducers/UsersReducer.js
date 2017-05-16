/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {} from '../frameworkHelper/FrameWorkUtils'
import {
    USER_DELETE_END, USER_DELETE_START,
    USER_DETAIL_END, USER_DETAIL_START,
    USER_LIST_END, USER_LIST_START,
    USER_SAVE_END, USER_SAVE_START,
    USER_MANAGER_LIST_END, USER_MANAGER_LIST_START
} from '../constants/index'

/*获取所有团队负责人*/
export function userManagerListReducer(state = {fetching: false, data: ""}, action) {
    switch (action.type) {
        case USER_MANAGER_LIST_START:
            state = {fetching: true};
            return state;
        case USER_MANAGER_LIST_END:
            state = {fetching: false, data: action.json};
            return state;
        default:
            return state;
    }
}

/*获取团队成员负责人*/
export function userListByManagerReducer(state = {fetching: false, data: ""}, action) {
    switch (action.type) {
        case USER_LIST_START:
            state = {fetching: true};
            return state;
        case USER_LIST_END:
            state = {fetching: false, data: action.json};
            return state;
        default:
            return state;
    }
}

