/**
 * Created by Administrator on 2016/8/19.
 */
import {
    END_REFRESH
} from '../constants/index'
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {} from '../frameworkHelper/FrameWorkUtils'


export function commonRefresh() {
    return dispatch=> {
        dispatch(startFetch(END_REFRESH))
    }
}
function startFetch(type) {
    return {
        type: type
    }
}

function endFetch(type, json) {
    return {
        type: type,
        json
    }
}
