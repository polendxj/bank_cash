/**
 * Created by Administrator on 2016/11/2.
 */
var CatchUncaughtException = function (func, resp) {
    try {
        func()
    } catch (e) {
        if (resp) {
            resp.send({message: '出现未知错误....'})
        }
        logger.error(e.stack)
    }
};

var CatchNot200Exception = function (res, data, resp) {
    if (res.status == 200) {
        if (res.url.indexOf('loginForm') >= 0) {
            return {message: '会话过期，请重新登录...'}
        } else {
            return res.json();
        }

    } else {
        logger.error(res.url + ',' + res.status + ',' + res.statusText + ',data:' + data)
        return false;
    }
};

var CatchNotFalseException = function (json, resp, callback) {
    if (!json) {
        resp.send({message: '出现未知错误....'})
    } else if (callback) {
        callback(json)
    } else {
        resp.send(json)
    }
};

var ObjArrSort = function (name) {
    return function (o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        }
        else {
            throw ("error");
        }

    }

};

var DecodeBase64 = function (data) {
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    return decode(data);

    function decode(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    function _utf8_decode(utftext) {
        var string = "";
        var i = 0;
        var c = 0, c1 = 0, c2 = 0, c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
};

var FormatDate = function (now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
};

var Request = function (url, method, data, req, resp, callback) {
    var resTemp = "";
    CatchUncaughtException(function () {
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
                return CatchNot200Exception(res, data)

            })
            .then(function (json) {
                if (resTemp.status == 404) {
                    CatchNotFalseException("-10000", resp, callback)
                } else {
                    CatchNotFalseException(json, resp, callback)
                }
            })
            .catch(function (ex) {
                resp.sendStatus(500)
            });
    }, resp)
};

var JSONStrToObj = function (content) {
    return JSON.parse(JSON.stringify(content));
};

module.exports.uncaughtException = CatchUncaughtException;
module.exports.not200Exception = CatchNot200Exception;
module.exports.notFalseException = CatchNotFalseException;
module.exports.ObjArrSort = ObjArrSort;
module.exports.DecodeBase64 = DecodeBase64;
module.exports.FormatDate = FormatDate;
module.exports.Request = Request;
module.exports.JSONStrToObj = JSONStrToObj;