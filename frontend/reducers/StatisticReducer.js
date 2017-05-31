/**
 * Created by Captain on 2017/5/27.
 */
import {combineReducers} from 'redux'
import {} from '../frameworkHelper/FrameWorkUtils'
import {
    BIND_CARD_USER_START,BIND_CARD_USER_END,
    TASK_USER_START,TASK_USER_END,
    TASK_HISTORY_START,TASK_HISTORY_END,
    SYSTEM_OPERATION_START,SYSTEM_OPERATION_END,
    NEW_TEN_START,NEW_TEN_END
} from '../constants/index'
/*获取绑定卡的总人数统计信息*/
export function getBindCardUsers(state = {fetching: false, data: ""}, action) {
    switch (action.type) {
        case BIND_CARD_USER_START:
            state = {fetching: true};
            return state;
        case BIND_CARD_USER_END:
            state = {fetching: false, data: action.json};
            return state;
        default:
            return state;
    }
}

/*获取任务的总人数统计信息*/
export function getTaskUsers(state = {fetching: false, data: ""}, action) {
    switch (action.type) {
        case TASK_USER_START:
            state = {fetching: true};
            return state;
        case TASK_USER_END:
            state = {fetching: false, data: action.json};
            return state;
        default:
            return state;
    }
}
/*获取历史任务统计信息*/
export function getTaskHistory(state = {fetching: false, data: ""}, action) {
    switch (action.type) {
        case TASK_HISTORY_START:
            state = {fetching: true};
            return state;
        case TASK_HISTORY_END:
            state = {fetching: false, data: action.json};
            return state;
        default:
            return state;
    }
}

/*获取系统操作统计信息*/
export function getOperations(state = {fetching: false, data: ""}, action) {
    switch (action.type) {
        case SYSTEM_OPERATION_START:
            state = {fetching: true};
            return state;
        case SYSTEM_OPERATION_END:
            state = {fetching: false, data: action.json};
            return state;
        default:
            return state;
    }
}

/*获取最近10条历史任务信息*/
export function getNewTenTask(state = {fetching: false, data: ""}, action) {
    switch (action.type) {
        case NEW_TEN_START:
            state = {fetching: true};
            return state;
        case NEW_TEN_END:
            state = {fetching: false, data: action.json};
            return state;
        default:
            return state;
    }
}