/**
 * Created by Administrator on 2016/8/19.
 */
import {combineReducers} from 'redux'
import {} from '../frameworkHelper/FrameWorkUtils'
import {
    END_REFRESH
} from '../constants/index'

export function commonReducer(state = {refresh: false}, action) {
    switch (action.type) {
        case END_REFRESH:
            state = {refresh: !state.refresh};
            return state;
        default:
            return state;
    }
}
