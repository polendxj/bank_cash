/**
 * Created by Administrator on 2016/12/9.
 */
import fetch from 'isomorphic-fetch'
import {browserHistory} from 'react-router'
import {} from '../frameworkHelper/FrameWorkUtils'

/*
 * Function  This function can use multiple condition to search list
 * Params    startRow:search page start index    searchColumns:by what columns to search(is a array)    searchValues:by what values to search(is a array)    sortColumn:sort by what column    orderType:asc or desc
 *           startDispatch:if need start loading    endDispatch:finish loading and loaded   interfaceURL:loading URL
 * */
export function getListByMutilpCondition(startRow, searchColumns, searchValues, sortColumn, orderType, startDispatch, endDispatch, interfaceURL, customerColumn, customerValue) {
    return dispatch=> {
        if (startDispatch) {
            dispatch(startFetch(startDispatch))
        }
        var params = {
            startRow: startRow * page_size,
            endRow: page_size,
            page: '',
            searchColumn: searchValues && searchValues.length > 0 ? searchColumns : ["ALL"],
            searchValue: searchValues,
            sortColumn: sortColumn,
            orderType: orderType
        }
        if (customerColumn && customerColumn.length > 0) {
            customerColumn.forEach(function (val, key) {
                params[val] = customerValue[key];
            })
        }
        fetch(interfaceURL,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify(params)
            })
            .then(response=>response.json())
            .then(json=>dispatch(endFetch(endDispatch, json)))
    }
}

export function deleteObject(obj, startRow, searchColumns, searchValues, sortColumn, orderType, startDispatch, endDispatch, deleteInterface, listInterface, customerColumn, customerValue,callback) {
    return dispatch=> {
        console.log(obj)
        fetch(deleteInterface,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'data=' + JSON.stringify(obj)
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    if (startDispatch) {
                        dispatch(startFetch(startDispatch))
                    }
                    var params = {
                        startRow: startRow * page_size,
                        endRow: page_size,
                        page: '',
                        searchColumn: searchColumns,
                        searchValue: searchValues,
                        sortColumn: sortColumn,
                        orderType: orderType
                    }
                    if (customerColumn && customerColumn.length > 0) {
                        customerColumn.forEach(function (val, key) {
                            params[val] = customerValue[key];
                        })
                    }
                    fetch(listInterface,
                        {
                            credentials: 'include',
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: "data=" + JSON.stringify(params)
                        })
                        .then(response=>response.json())
                        .then(json=>dispatch(endFetch(endDispatch, json)))
                } else {
                    // dispatch(endDeleteCsr(json))
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
                }
            })
    }
}

export function getDetail(jsonObj, startDispatch, endDispatch, interfaceURL) {
    return dispatch=> {
        if (startDispatch) {
            dispatch(startFetch(startDispatch))
        }
        fetch(interfaceURL,
            {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify(jsonObj)
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(endDispatch, json))
                } else {
                    // dispatch(endDeleteCsr(json))
                    // ErrorModal('警告!', '详情获取失败:' + json.message)
                    dispatch(endFetch(endDispatch, json))
                }
            })
    }
}

export function saveObject(data, startDispatch, endDispatch, interfaceURL, listRouter, flag, checkUrl, checkData,callback) {
    return dispatch=> {
        if (startDispatch) {
            dispatch(startFetch(startDispatch))
        }
        if (checkUrl) {
            fetch(checkUrl,
                {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "data=" + JSON.stringify(checkData)
                })
                .then(response=>response.json())
                .then(function (json) {
                    if (json.result == 'SUCCESS' && json.count == 0) {
                        fetch(interfaceURL,
                            {
                                credentials: 'include',
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                body: "data=" + JSON.stringify(data)
                            })
                            .then(response=>response.json())
                            .then(function (json) {
                                if (json.result == 'SUCCESS') {
                                    dispatch(endFetch(endDispatch, json))
                                    if (!flag) {
                                        ConfirmModalSuccess(Current_Lang.alertTip.registerSuccess, Current_Lang.alertTip.needContinueAdd, function () {
                                            browserHistory.push(listRouter)
                                        })
                                    } else if (flag == "update") {
                                        SuccessModal(Current_Lang.alertTip.tip, Current_Lang.alertTip.updateSuccess)
                                        browserHistory.push(listRouter)
                                    } else {
                                        SuccessModal(Current_Lang.alertTip.tip, Current_Lang.alertTip.updateSuccess)
                                    }
                                } else {
                                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
                                }
                            })
                    } else {
                        ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + Current_Lang.tableTitle.exist)
                    }
                })

        } else {
            fetch(interfaceURL,
                {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "data=" + JSON.stringify(data)
                })
                .then(response=>response.json())
                .then(function (json) {
                    if (json.result == 'SUCCESS') {
                        dispatch(endFetch(endDispatch, json))
                        if (!flag) {
                            ConfirmModalSuccess(Current_Lang.alertTip.registerSuccess, Current_Lang.alertTip.needContinueAdd, function () {
                                browserHistory.push(listRouter)
                            })
                        } else if (flag == "update") {
                            SuccessModal(Current_Lang.alertTip.tip, Current_Lang.alertTip.updateSuccess)
                            browserHistory.push(listRouter)
                        } else {
                            SuccessModal(Current_Lang.alertTip.tip, Current_Lang.alertTip.updateSuccess)
                        }
                        if(callback){
                            callback()
                        }
                    } else {
                        ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
                    }
                })
        }


    }
}

export function saveObjectByPut(data, startDispatch, endDispatch, interfaceURL, listRouter, flag) {
    return dispatch=> {
        if (startDispatch) {
            dispatch(startFetch(startDispatch))
        }
        fetch(interfaceURL,
            {
                credentials: 'include',
                method: 'PUT',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "data=" + JSON.stringify(data)
            })
            .then(response=>response.json())
            .then(function (json) {
                if (json.result == 'SUCCESS') {
                    dispatch(endFetch(endDispatch, json))
                    if (!flag) {
                        ConfirmModalSuccess(Current_Lang.alertTip.registerSuccess, Current_Lang.alertTip.needContinueAdd, function () {
                            browserHistory.push(listRouter)
                        })
                    } else if (flag == "update") {
                        SuccessModal(Current_Lang.alertTip.tip, Current_Lang.alertTip.updateSuccess)
                        browserHistory.push(listRouter)
                    } else {
                        SuccessModal(Current_Lang.alertTip.tip, Current_Lang.alertTip.updateSuccess)
                    }
                } else {
                    ErrorModal(Current_Lang.status.minor, Current_Lang.status.someError + json.message)
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