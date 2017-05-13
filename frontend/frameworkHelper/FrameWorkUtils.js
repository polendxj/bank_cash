/**
 * Created by Administrator on 2017/5/9.
 */

/*
* @author    Jabriel
* @see       对数据进行Base64解码
* @param     data
*            需要解码的数据
* @return
* @exception
* */
export function DecodeBase64(data) {
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
}

/*
 * @author    Jabriel
 * @see       对数据进行Base64编码
 * @param     data
 *            需要编码的数据
 * @return
 * @exception
 * */
export function EncodeBase64(form) {
    // base64 인코딩 함수 (자바스크립트에서 인코딩 해서 넘김)
    var InStr = form;
    var ttb = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var len_1 = InStr.length;
    var len_res = InStr.length % 3;
    var len_div = len_1 - len_res;
    var ra = new makeArray(4);
    var i = 0;
    var Stat = "";
    var str = "";
    while (1) {
        if (i >= len_1)
            break;

        if (i >= len_div)
            Stat = "End";
        var A = eval(InStr.charCodeAt(i++));
        var B = eval(InStr.charCodeAt(i++));
        var C = eval(InStr.charCodeAt(i++));
        if (i > len_div) {
            Stat = "End";
            if (len_res >= 1)
                C = 0;
            if (len_res == 1)
                B = 0;
        }
        ra[1] = A >> 2;
        ra[2] = ((A & 3) << 4) + (B >> 4);
        ra[3] = ((B & 15) << 2) + (C >> 6);
        ra[4] = C & 63;
        if (Stat == "End" && len_res >= 1)
            ra[4] = 64;
        if (Stat == "End" && len_res == 1)
            ra[3] = 64;
        for (var k = 1; k <= 4; k++)
            str = str + ttb.substr(ra[k], 1);
    }

    return str;

}

/*
 * @author    Jabriel
 * @see       删除存在于浏览器中某cooike值
 * @param     name
 *            cookie的key
 * @return
 * @exception
 * */
export function deleteCookie(name) {
    var myDate = new Date();
    myDate.setTime(-10000);
    document.cookie = name + "=''; expires=" + myDate.toUTCString() + "; path=/;";
}

/*
 * @author    Jabriel
 * @see       生成uuid，全球唯一标识符
 * @param
 * @return
 * @exception
 * */
export function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

/*
 * @author    Jabriel
 * @see       将时间格式化成yy:mm:dd的格式
 * @param     time
 *            传入的合法的时间参数
 * @return
 * @exception
 * */
export function FormatDate(time) {
    var date = new Date(time);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

/*
 * @author    Jabriel
 * @see       按照对象中的某一属性排序，最多支持对象的两层
 * @param     // TODO 此方法需要进一步改进
 *
 * @return
 * @exception
 * */
export function ObjArrSort(name, sortLevel, flag) {
    return function (o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            if (sortLevel && o[name] && p[name] && o[name][sortLevel] && p[name][sortLevel]) {
                a = o[name][sortLevel];
                b = p[name][sortLevel];
            } else {
                a = o[name];
                b = p[name];
            }

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

}

/*
 * @author    Jabriel
 * @see       将传入的信息转换称哈希散列值
 * @param     strKey
 *            传入需要转换的数据
 * @return
 * @exception
 * */
export function hashCode(strKey) {
    var hash = 0;
    if (!isNull(strKey)) {
        for (var i = 0; i < strKey.length; i++) {
            hash = hash * 31 + strKey.charCodeAt(i);
            hash = intValue(hash);
        }
    }
    return hash;
}

function isNull(str) {
    return str == null || str.value == "";
}
function makeArray(n) {
    this.length = n
    for (var i = 1; i <= n; i++) {
        this[i] = null;
    }
    return this
}
function intValue(num) {
    var MAX_VALUE = 0x7fffffff;
    var MIN_VALUE = -0x80000000;
    if (num > MAX_VALUE || num < MIN_VALUE) {
        return num &= 0xFFFFFFFF;
    }
    return num;
}