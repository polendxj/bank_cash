/**
 * Created by Administrator on 2016/11/2.
 */
var fetch = require('node-fetch');
var querystring = require('querystring');
var ExceptionUtils = require('../utils/ExceptionUtils');

var Request = function (url, method, data, req, resp, callback) {
    var resTemp = "";
    ExceptionUtils.uncaughtException(function () {
        fetch(url,
            {
                method: method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                body: data,
                timeout: 30000
            })
            .then(function (res) {
                resTemp = res;
                return ExceptionUtils.not200Exception(res, data)

            })
            .then(function (json) {
                if (resTemp.status == 404) {
                    ExceptionUtils.notFalseException("-10000", resp, callback)
                } else {
                    // console.log(resTemp)
                    ExceptionUtils.notFalseException(json, resp, callback)
                }
            })
            .catch(function (ex) {
                resp.sendStatus(500)
            });
    }, resp)
};


module.exports.Request = Request