/**
 * Created by Administrator on 2016/12/9.
 */
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {} from '../frameworkHelper/FrameWorkUtils'
import {operation_notification, ConfirmModal} from '../businessHelper/BusinessUtils'
/*
 * Function  This function can use multiple condition to search list
 * Params    startRow:search page start index    searchColumns:by what columns to search(is a array)    searchValues:by what values to search(is a array)    sortColumn:sort by what column    orderType:asc or desc
 *           startDispatch:if need start loading    endDispatch:finish loading and loaded   interfaceURL:loading URL
 * */
export function getListByMutilpCondition(params, startDispatch, endDispatch, interfaceURL, callback) {
    return dispatch=> {
        if (startDispatch) {
            dispatch(startFetch(startDispatch))
        }
        fetch(node_service + interfaceURL,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params)
            })
            .then(response=>response.json())
            .then(function (json) {
                dispatch(endFetch(endDispatch, json));
                if (callback) {
                    callback(json);
                }
            })
    }
}

export function deleteObject(obj, startDispatch, endDispatch, deleteInterface, callback) {
    return dispatch=> {
        if (startDispatch) {
            dispatch(startFetch(startDispatch))
        }
        fetch(node_service + deleteInterface,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(endDispatch, json));
                    operation_notification(1);
                    if (callback) {
                        callback(json);
                    }
                } else {
                    operation_notification(0, json.message);
                    if (callback) {
                        callback(json);
                    }
                }
            })
    }
}

export function getDetail(jsonObj, startDispatch, endDispatch, interfaceURL, callback) {
    return dispatch=> {
        if (startDispatch) {
            dispatch(startFetch(startDispatch))
        }
        fetch(node_service + interfaceURL,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: "data=" + JSON.stringify(jsonObj)
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(endDispatch, json))
                } else {
                    dispatch(endFetch(endDispatch, json))
                }
                if (callback) {
                    callback(json);
                }
            })
    }
}

export function saveObject(data, startDispatch, endDispatch, interfaceURL, callback) {
    return dispatch=> {
        if (startDispatch) {
            dispatch(startFetch(startDispatch))
        }
        fetch(node_service + interfaceURL,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    operation_notification(1);
                    dispatch(endFetch(endDispatch, json));
                } else {
                    operation_notification(0, json.message)
                }
                if (callback) {
                    callback(json);
                }
            })


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