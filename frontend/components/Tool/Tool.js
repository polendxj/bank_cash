/**
 * Created by Administrator on 2016/8/29.
 */
import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import classnames from 'classnames';
import {browserHistory} from 'react-router'

export class Loading extends Component {
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <button type="button" className="btn btn-default"
                        style={{border: '0 red solid', background: 'transparent', fontSize: '20px'}}><i
                    className="icon-spinner9 spinner position-left"
                    style={{fontSize: '20px'}}></i>{this.props.text ? this.props.text : Current_Lang.label.loadingData}
                </button>
            </div>
        )
    }
}

export class NoData extends Component {
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <button type="button" className="btn btn-default"
                        style={{
                            border: '0 red solid',
                            background: 'transparent',
                            fontSize: '20px',
                            color: 'lightgray'
                        }}>{this.props.text ? this.props.text : Current_Lang.label.noData}
                </button>
            </div>

        )
    }
}


export function ConfirmModal(title, content, callback) {
    swal({
        title: title,
        text: content,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FF7043",
        confirmButtonText: Current_Lang.alertTip.confirm,
        cancelButtonText: Current_Lang.label.cancel
    }, function (confirm) {
        if (confirm) {
            callback()
        }
    });
}

export function ConfirmModalSuccess(title, content, callback) {
    swal({
        title: title,
        text: content,
        type: "success",
        showCancelButton: true,
        confirmButtonColor: "#193153",
        confirmButtonText: Current_Lang.alertTip.continueRegister,
        cancelButtonText: Current_Lang.alertTip.returnList
    }, function (confirm) {
        if (confirm) {

        } else {
            callback()
        }
    });
}

export class FormModal extends Component {
    _ensureBtn() {
        this.props.doAction()
    }

    render() {
        return (
            <div id="FormModal" className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h5 className="modal-title">{this.props.tip}</h5>
                        </div>

                        <div className="modal-body">
                            {this.props.content}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-link" data-dismiss="modal">取 消</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal"
                                    onClick={this._ensureBtn.bind(this)}>确 定
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class ListModal extends Component {
    _ensureBtn() {
        this.props.doAction(this.props.data)
    }

    render() {
        return (
            <div id="ListModal" className="modal fade">
                <div className="modal-dialog modal-dialog modal-full">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h5 className="modal-title">{this.props.tip}</h5>
                        </div>

                        <div className="modal-body">
                            {this.props.content}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal"
                                    onClick={this._ensureBtn.bind(this)}>{Current_Lang.alertTip.confirm}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class ListMiddleModal extends Component {
    _ensureBtn() {
        this.props.doAction(this.props.data)
    }

    render() {
        return (
            <div id={this.props.id ? this.props.id : "ListModal"} className="modal fade">
                <div className="modal-dialog modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h5 className="modal-title">{this.props.tip}</h5>
                        </div>

                        <div className="modal-body">
                            {this.props.content}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-link" data-dismiss="modal"
                                    style={{display: this.props.hideCancel ? 'none' : 'inline-block'}}>
                                {Current_Lang.label.cancel}
                            </button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal"
                                    style={{display: this.props.hide ? 'none' : 'inline-block'}}
                                    onClick={this._ensureBtn.bind(this)}>{this.props.actionText ? this.props.actionText : Current_Lang.tableTitle.edit}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class CustomeListMiddleModal extends Component {
    _ensureBtn() {
        this.props.doAction(this.props.data)
    }

    render() {
        return (
            <div id={this.props.cusID} className="modal fade">
                <div className="modal-dialog modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h5 className="modal-title">{this.props.tip}</h5>
                        </div>

                        <div className="modal-body">
                            {this.props.content}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-link" data-dismiss="modal">
                                关 闭
                            </button>
                            <button style={{display: this.props.doAction ? '' : 'none'}} type="button"
                                    className="btn btn-primary" data-dismiss="modal"
                                    onClick={this._ensureBtn.bind(this)}>编 辑
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class ListFullModal extends Component {
    _ensureBtn() {
        this.props.doAction(this.props.data)
    }

    render() {
        return (
            <div id="ListModal" className="modal fade">
                <div className="modal-dialog modal-dialog modal-full">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h5 className="modal-title">{this.props.tip}</h5>
                        </div>

                        <div className="modal-body">
                            {this.props.content}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-link" data-dismiss="modal">
                                关 闭
                            </button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal"
                                    onClick={this._ensureBtn.bind(this)}>编 辑
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export function showWarningNotification(header, content) {
    PNotify.desktop.permission();
    (new PNotify({
            title: header,
            type: 'warning',
            text: content,
            desktop: {
                desktop: true,
                icon: '/assets/images/pnotify/warning.png'
            }
        })
    );
}

export function showSuccessNotification(header, content) {
    PNotify.desktop.permission();
    (new PNotify({
            title: header,
            type: 'success',
            text: content,
            desktop: {
                desktop: true,
                icon: '/assets/images/pnotify/warning.png'
            }
        })
    );
}

export function CreateNodeChart(nodes, links, payload) {
    var width = 300,
        height = 300,
        colors = d3.scale.category10();

    var svg = d3.select('#' + payload)
        .append('svg')
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("viewBox", "0 0 300 300")
    // [
    // {id: 'dadsada', reflexive: false},
    // {id: 1, reflexive: false},
    // {id: 2, reflexive: false},
    // {id: 3, reflexive: false},
    // {id: 4, reflexive: false},
    // {id: 5, reflexive: false}
    // ]

    // [
    // {source: nodes[0], target: nodes[1], left: false, right: true},
    // {source: nodes[1], target: nodes[2], left: false, right: true}
    // ]
    var nodes = nodes,
        links = links;

    var force = d3.layout.force()
        .nodes(nodes)
        .links(links)
        .size([width, height])
        .linkDistance(150)
        .charge(-500)
        .on('tick', tick)

    svg.append('svg:defs').append('svg:marker')
        .attr('id', 'end-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 6)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
        .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#000');
    svg.append('svg:defs').append('svg:marker')
        .attr('id', 'start-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 4)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
        .append('svg:path')
        .attr('d', 'M10,-5L0,0L10,5')
        .attr('fill', '#000');

    var path = svg.append('svg:g').selectAll('path'),
        circle = svg.append('svg:g').selectAll('g');
    var selected_node = null,
        selected_link = null,
        mousedown_link = null,
        mousedown_node = null,
        mouseup_node = null;

    function resetMouseVars() {
        mousedown_node = null;
        mouseup_node = null;
        mousedown_link = null;
    }

    function tick() {
        path.attr('d', function (d) {
            var deltaX = d.target.x - d.source.x,
                deltaY = d.target.y - d.source.y,
                dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
                normX = deltaX / dist,
                normY = deltaY / dist,
                sourcePadding = d.left ? 17 : 12,
                targetPadding = d.right ? 17 : 12,
                sourceX = d.source.x + (sourcePadding * normX),
                sourceY = d.source.y + (sourcePadding * normY),
                targetX = d.target.x - (targetPadding * normX),
                targetY = d.target.y - (targetPadding * normY);
            return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
        });

        circle.attr('transform', function (d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        });
    }

    function restart() {
        path = path.data(links);

        path.classed('selected', function (d) {
            return d === selected_link;
        })
            .style('marker-start', function (d) {
                return d.left ? 'url(#start-arrow)' : '';
            })
            .style('marker-end', function (d) {
                return d.right ? 'url(#end-arrow)' : '';
            });

        path.enter().append('svg:path')
            .attr('class', 'link')
            .classed('selected', function (d) {
                return d === selected_link;
            })
            .style('marker-start', function (d) {
                return d.left ? 'url(#start-arrow)' : '';
            })
            .style('marker-end', function (d) {
                return d.right ? 'url(#end-arrow)' : '';
            })
        circle = circle.data(nodes, function (d) {
            return d.id;
        });
        circle.selectAll('circle')
            .style('fill', function (d) {
                return (d === selected_node) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id);
            })
            .classed('reflexive', function (d) {
                return d.reflexive;
            });
        var g = circle.enter().append('svg:g');

        g.append('svg:circle')
            .attr('class', 'node')
            .attr('r', 12)
            .style('fill', function (d) {
                return (d === selected_node) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id);
            })
            .style('stroke', function (d) {
                return d3.rgb(colors(d.id)).darker().toString();
            })
            .classed('reflexive', function (d) {
                return d.reflexive;
            })
            .on('mouseover', function (d) {
                if (!mousedown_node || d === mousedown_node) return;
                // enlarge target node
                d3.select(this).attr('transform', 'scale(1.1)');
            })
        // show node IDs
        g.append('svg:text')
            .attr('x', 0)
            .attr('y', 4)
            .attr('class', 'id')
            .text(function (d) {
                return d.id;
            });
        circle.exit().remove();
        force.start();
    }

    restart();
}

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

function makeArray(n) {
    this.length = n
    for (var i = 1; i <= n; i++) {
        this[i] = null;
    }
    return this
}

export function SuccessModal(title, content, link) {
    swal({
        title: title,
        text: content,
        confirmButtonColor: "#66BB6A",
        type: "success",
        timer: 2000
    });

}

export function ErrorModal(title, content) {
    setTimeout(function () {
        swal({
            title: title,
            text: content,
            confirmButtonColor: "#EF5350",
            type: "error"
        });
    }, 500)

}

export function DealingModal(title) {
    swal({
        title: title,
        confirmButtonColor: "transparent"
    });
}

export function audioCodes(num) {
    // 0 - AAC, 1 - AC3, 2 - MPEG-2
    if (num == 0) {
        return 'ACC'
    } else if (num == 1) {
        return 'AC3'
    } else if (num == 2) {
        return 'MPEG-2'
    }
}

export function videoCodes(num) {
    //-	Video Codec : 0 - 264, 1 - MPEG-2
    if (num == 0) {
        return '264'
    } else if (num == 1) {
        return 'MPEG-2'
    }
}

export function alarmTargetTypeFilter(targetType) {
    //-	Video Codec : 0 - 264, 1 - MPEG-2
    if (targetType == "1") {
        return Current_Lang.tableTitle.cpu;
    } else if (targetType == "2") {
        return Current_Lang.tableTitle.memory;
    } else if (targetType == "3") {
        return Current_Lang.tableTitle.network;
    } else if (targetType == "4") {
        return Current_Lang.tableTitle.disk;
    } else {
        return Current_Lang.label.unknown;
    }
}

export function warningLevelFilter(targetType) {
    //-	Video Codec : 0 - 264, 1 - MPEG-2
    if (targetType.toLowerCase() == "fatal") {
        return Current_Lang.status.fatal;
    } else if (targetType.toLowerCase() == "critical") {
        return Current_Lang.status.critical;
    } else if (targetType.toLowerCase() == "major") {
        return Current_Lang.status.major;
    } else if (targetType.toLowerCase() == "minor") {
        return Current_Lang.status.minor;
    } else {
        return Current_Lang.status.unknown;
    }
}

export function warningLevelColorFilter(targetType) {
    //-	Video Codec : 0 - 264, 1 - MPEG-2
    if (targetType == "FATAL") {
        return "#E31836";
    } else if (targetType == "CRITICAL") {
        return "#E31836";
    } else if (targetType == "MAJOR") {
        return "#E31836";
    } else if (targetType == "MINOR") {
        return "#FD7900";
    } else {
        return Current_Lang.status.unknown;
    }
}

export function roleApplicationUse() {
    var result = true
    var rules = JSON.parse(sessionStorage['rules'])
    if (rules.permissionId == "SV") {
        result = true;
    } else {
        result = false;
    }
    return result

    // if (type) {
    //
    // } else {
    //     for (var rule in rules) {
    //         if (rule == obj && (rules[rule] == false || rules[rule] == 'false')) {
    //             result = false
    //         }
    //     }
    // }
}

export function buildSort(tableID) {
    $("#" + tableID).find('th').on('click', function () {
        if ($(this).children("i").hasClass('icon-arrow-down5') || $(this).children("i").hasClass('icon-arrow-up5')) {
            if ($(this).children("i").hasClass('icon-arrow-down5')) {
                $(this).children("i").removeClass('icon-arrow-down5');
                $(this).children("i").addClass('icon-arrow-up5');
            } else {
                $(this).children("i").removeClass('icon-arrow-up5');
                $(this).children("i").addClass('icon-arrow-down5');
            }
        } else {
            $("#" + tableID).find("th").each(function (idx) {
                if ($("#" + tableID).find("th").eq(idx).children('i').hasClass('icon-arrow-up5') || $("#" + tableID).find("th").children('i').hasClass('icon-arrow-down5')) {
                    $("#" + tableID).find("th").eq(idx).children('i').removeClass();
                }
            });
            $("#" + tableID).find("th").find('i').has('icon-arrow-down5').removeClass();
            $(this).children("i").addClass('icon-arrow-down5');
        }
    })
}

export function findSortInfo(tableID) {
    var result = ""
    $("#" + tableID).find("th").each(function (idx) {
        if ($("#" + tableID).find("th").eq(idx).children('i').hasClass('icon-arrow-up5')) {
            result = 'ASC';
        } else if ($("#" + tableID).find("th").children('i').hasClass('icon-arrow-down5')) {
            result = 'DESC';
        }
    });
    return result;
}

export function deleteCookie(name) {
    var myDate = new Date();
    myDate.setTime(-10000);
    document.cookie = name + "=''; expires=" + myDate.toUTCString() + "; path=/;";
}

export function serverStatus(text) {
    switch (text) {
        case '在线':
            return 'Y';
            break;
        case '离线':
            return 'N';
            break;
        case '停止':
            return 'S';
            break;

    }
}

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

export function streamingTemplateFilter(flag, value, resolutionRollback) { //0-streamingType       1-environment   2-format    3-resolution    4-encoding
    var streamingType = {"1": "VCS", "2": "ICS"};
    var environment = {"1": "QAM", "2": "IP"};
    var format = {"1": "PNG", "2": "JPG", "3": "ES", "4": "TS"};
    var resolution = {"0": Current_Lang.others.autoAdapt, "1": "HD 720P", "2": "SD 576P", "3": "SD 480P"};
    var encoding = {"1": "H.264/AAC", "2": "MPEG2/MPEG1-L2"};
    var result = "- -";
    switch (flag) {
        case 0:
            result = streamingType[value];
            break;
        case 1:
            result = environment[value];
            break;
        case 2:
            result = format[value];
            break;
        case 3:
            if (resolutionRollback) {
                result = Current_Lang.label.all;
                for (var mt in resolution) {
                    if (resolution[mt] == value) {
                        result = mt;
                    }
                }
                return result;
            } else {
                result = resolution[value];

            }
            break;
        case 4:
            result = encoding[value];
            break;
    }
    return result;
}

export function materialTypeFilter(value, flag) {
    var materialType = {
        "0": Current_Lang.others.staticImgOfInner,
        "1": Current_Lang.others.staticImgOfOuter,
        "2": Current_Lang.others.activeImg
    };
    if (flag) {
        var result = Current_Lang.label.all;
        for (var mt in materialType) {
            if (materialType[mt] == value) {
                result = mt;
            }
        }
        return result;
    } else {
        return materialType[value]

    }
}

export function resolutionFilter(value) { //0-streamingType       1-environment   2-format    3-resolution    4-encoding
    var result = 0;
    switch (value) {
        case 720:
            result = "HD 720P";
            break;
        case 576:
            result = "SD 576P";
            break;
        case 480:
            result = "SD 480P";
            break;

    }
    return result;
}

export function cseConfigType(value) { //0-undo      1-doing   2-done
    var result = 0;
    switch (value) {
        case 0:
            result = "未生效";
            break;
        case 1:
            result = "生效中";
            break;
        case 2:
            result = "已生效";
            break;

    }
    return result;
}

export function FormatDate(strTime) {
    var date = new Date(strTime);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

export function AnimationDefine(flag, value) {
    var inAnimation = {0: "Slide In", 1: "Zoom In", 2: "Fade In"};
    var outAnimation = {0: "Slide Out", 1: "Zoom Out", 2: "Fade Out"};
    if (flag == "in") {
        return inAnimation[value];
    } else if (flag == "out") {
        return outAnimation[value];
    } else if (flag == "inList") {
        return inAnimation;
    } else if (flag == "outList") {
        return outAnimation;
    }
}

export function TaskTypeFilter(value) {
    var types = {0: "广告", 1: "推广", 2: "资讯"};
    return types[value];
}

export function ConvertTimeToSecond(value) {
    var threeT = value.split(":");
    return parseInt(threeT[0] * 3600) + parseInt(threeT[1] * 60) + parseInt(threeT[2]);
}

export function ConvertTimeToThreeT(value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
        }
    }
    var result = "" + parseInt(theTime) + "秒";
    if (theTime1 > 0) {
        result = "" + parseInt(theTime1) + "分" + result;
    }
    if (theTime2 > 0) {
        result = "" + parseInt(theTime2) + "小时" + result;
    }
    return result;
}

export function FilterByConsul(data, condition, page, sortLevel, sortType, sortLogic, f) {
    var result = [];
    var keyCount = 0;
    for (var c in condition) {
        keyCount++;
    }
    if (data != -10000) {
        data.forEach(function (val, key) {
            var obj = f ? JSON.parse(val.Value ? DecodeBase64(val.Value) : "") : val;
            var flag = 0;
            if (condition.hasOwnProperty("fullSearch")) {
                var getLeftValue = JSON.stringify(obj);
                if (getLeftValue.indexOf(condition["fullSearch"].trim()) >= 0) {
                    result.push(val);
                }
            } else {
                for (var c in condition) {
                    var getLeftValue = JSON.stringify(obj).substring(JSON.stringify(obj).trim().indexOf('"' + c.trim() + '"') + c.length + 4);
                    var realValue = getLeftValue.substring(0, getLeftValue.indexOf('"'));

                    if (realValue.indexOf(condition[c].trim()) >= 0 || condition[c].trim() == Current_Lang.label.all || condition[c].trim() == "") {
                        flag++;
                    }
                }
                if (flag == keyCount) {
                    result.push(val);
                }
            }

        })
        return {
            data: sortLogic == "asc" ? result.sort(ObjArrSort(sortType, sortLevel)).slice(page * page_size, page_size * (page + 1)) : result.sort(ObjArrSort(sortType, sortLevel)).reverse().slice(page * page_size, page_size * (page + 1)),
            count: result.length
        };
    } else {
        return {
            data: [],
            count: 0
        }
    }
}

export function FilterByObject(data, condition, page, sortLevel, sortType, sortLogic, f) {
    var result = [];
    var keyCount = 0;
    for (var c in condition) {
        keyCount++;
    }

}

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

function isNull(str) {
    return str == null || str.value == "";
}

/**
 * java String hashCode 的实现
 * @param strKey
 * @return intValue
 */
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

/**
 * 将js页面的number类型转换为java的int类型
 * @param num
 * @return intValue
 */
function intValue(num) {
    var MAX_VALUE = 0x7fffffff;
    var MIN_VALUE = -0x80000000;
    if (num > MAX_VALUE || num < MIN_VALUE) {
        return num &= 0xFFFFFFFF;
    }
    return num;
}
