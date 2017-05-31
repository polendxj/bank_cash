/**
 * Created by Administrator on 2017/5/13.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router'
import BreadCrumb from '../components/BreadCrumb'
import {renderList, formatDate, historyStatus} from '../businessHelper/BusinessUtils'
import {getListByMutilpCondition} from '../actions/CommonActions'
import {
    BIND_CARD_USER_START, BIND_CARD_USER_END,
    TASK_USER_START, TASK_USER_END,
    TASK_HISTORY_START, TASK_HISTORY_END,
    SYSTEM_OPERATION_START, SYSTEM_OPERATION_END,
    NEW_TEN_START, NEW_TEN_END,

} from '../constants/index'

export default class HomeContainer extends Component {
    componentDidMount(){
        var cepletColor=({
            "primary":"#0090d9",
            "info":"#B5D1D8",
            "success":"#2ECC71",
            "warning":"#FFCC33",
            "danger":"#E15258",
            "inverse":"#62707D",
            "theme":"#f35958",
            "theme-inverse":"#0aa699",
            "palevioletred":"#372b32" ,
            "green":"#99CC00",
            "lightseagreen":"#1ABC9B",
            "purple":"#736086",
            "darkorange":"#f9ba46",
            "pink":"#d13a7a"
        });
        $.inColor= function(value, obj) {
            var foundVal;
            $.each(obj, function(key, val) {
                if (value === key) {
                    foundVal =  val;
                    return;
                }
            });
            return foundVal;
        };
        $.fillColor= function(obj) {
            var inColor=$.inColor(obj.data("color") || obj.data("toolscolor") || obj.data("counter-color") , cepletColor);
            var codeColor= inColor || obj.data("color") || obj.data("toolscolor") || obj.data("counter-color") ;
            return codeColor;
        };
        $('.easy-chart').each(function () {
            var thisEasy=$(this) , $data = $(this).data();
            $data.barColor = $.fillColor( thisEasy ) || "#6CC3A0";
            $data.size = $data.size || 119;
            $data.trackColor = $data.trackColor  || "#EEE";
            $data.lineCap = $data.lineCap  || "butt";
            $data.lineWidth = $data.lineWidth  || 20;
            $data.scaleColor = $data.scaleColor || false,
                $data.onStep = function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            thisEasy.find('.percent').css({"line-height": $data.size+"px"});
            thisEasy.easyPieChart($data);
        });
        $('.knob').each(function () {
            var thisKnob = $(this) , $data = $(this).data();
            $data.fgColor=$.fillColor( thisKnob ) || "#F37864";
            thisKnob.knob($data);
            if ( $data.animate ) {
                $({  value: 0 }).animate({   value: this.value }, {
                    duration: 1000, easing: 'swing',
                    step: function () { thisKnob.val(Math.ceil(this.value)).trigger('change'); }
                });
            }
        });
        $(".showcase-chart-knob").each(function () {
            var color='', ico=$(this).find("h5 i"),  $label=$(this).find("span"), $knob=$(this).find("input");
            $label.each(function (i) {
                if (i == 0) {
                    color = $knob.attr("data-color")  || '#87CEEB' ;
                }else{
                    color=$knob.attr("data-bgColor")  || '#CCC';
                }
                $(this).find("i").css("color", color );
                $(this).find("a small").css("color", color );
            });
            ico.css("margin-left",Math.ceil(-1*(ico.width()/2)));
        });
        this.props.dispatch(getListByMutilpCondition({}, BIND_CARD_USER_START, BIND_CARD_USER_END, bind_card_user));
        this.props.dispatch(getListByMutilpCondition({}, TASK_USER_START, TASK_USER_END, task_user));
        this.props.dispatch(getListByMutilpCondition({}, TASK_HISTORY_START, TASK_HISTORY_END, task_history));
        this.props.dispatch(getListByMutilpCondition({}, SYSTEM_OPERATION_START, SYSTEM_OPERATION_END, system_operation));
        this.props.dispatch(getListByMutilpCondition({}, NEW_TEN_START, NEW_TEN_END, new_ten));
    }
    componentDidUpdate(){
        if(this.props.bindCardUsers&&this.props.bindCardUsers.result=="SUCCESS"){
            $('.knob').each(function () {
                var thisKnob = $(this) , $data = $(this).data();
                $data.fgColor=$.fillColor( thisKnob ) || "#F37864";
                thisKnob.knob($data);
                if ( $data.animate ) {
                    $({  value: 0 }).animate({   value: this.value }, {
                        duration: 1000, easing: 'swing',
                        step: function () { thisKnob.val(Math.ceil(this.value)).trigger('change'); }
                    });
                }
            });
        }
        if(this.props.systemOperations&&this.props.systemOperations.result=="SUCCESS"){

        }
    }
    render() {
        const {bindCardUsers,taskUsers, taskHistory, systemOperations, newTenTask} = this.props;
        console.log("bindCardUsers",bindCardUsers);
        console.log("taskUsers",taskUsers);
        console.log("taskHistory",taskHistory);
        console.log("systemOperations",systemOperations);
        console.log("newTenTask",newTenTask);
        var bindRate = 0;
        var delayOperationRate = 0;
        if(bindCardUsers&&bindCardUsers.result=="SUCCESS"){
            bindRate = parseInt((bindCardUsers.bindUser/bindCardUsers.totalUser)*100);
        }
        if(systemOperations&&systemOperations.result=="SUCCESS"){
            delayOperationRate = parseInt((systemOperations.delayOperation/systemOperations.totalOperation)*100);
        }
        var flowRecordWidth = 0;
        var codeSelectWidth = 0;
        var renewFeeWidth = 0;
        if(bindCardUsers&&bindCardUsers.result=="SUCCESS"&&taskUsers&&taskUsers.result=="SUCCESS"){
            flowRecordWidth = parseInt((taskUsers.flowRecordUser/bindCardUsers.totalUser)*100);
            codeSelectWidth = parseInt((taskUsers.codeSelectUser/bindCardUsers.totalUser)*100);
            renewFeeWidth = parseInt((taskUsers.renewFeeUser/bindCardUsers.totalUser)*100);
        }
        return (
            <div id="main">
                <BreadCrumb titles={["系统主面板"]}/>
                <div id="content">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="well bg-info">
                                <div className="widget-tile">
                                    <section>
                                        <h5><strong>流水提取</strong> 用户 </h5>
                                        <h2>{taskUsers&&taskUsers.result=="SUCCESS"?taskUsers.flowRecordUser:"- -"}</h2>
                                        <div className="progress progress-xs progress-white progress-over-tile">
                                            <div className="progress-bar  progress-bar-white" aria-valuemax="10000"
                                                 aria-valuenow={flowRecordWidth} style={{width: flowRecordWidth+"%"}}></div>
                                        </div>
                                        <label className="progress-label label-white"> 已提取流水共计 <a href="#">{taskHistory&&taskHistory.result=="SUCCESS"?taskHistory.flowRecordTask:"- -"}</a>
                                            次</label>
                                    </section>
                                    <div className="hold-icon"><i className="fa fa-xing"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="well bg-inverse">
                                <div className="widget-tile">
                                    <section>
                                        <h5><strong>后台选码</strong> 用户 </h5>
                                        <h2>{taskUsers&&taskUsers.result=="SUCCESS"?taskUsers.codeSelectUser:"- -"}</h2>
                                        <div className="progress progress-xs progress-white progress-over-tile">
                                            <div className="progress-bar  progress-bar-white" aria-valuemax="1000"
                                                 aria-valuenow={codeSelectWidth} style={{width: codeSelectWidth+"%"}}></div>
                                        </div>
                                        <label className="progress-label label-white"> 已后台选码共计 {taskHistory&&taskHistory.result=="SUCCESS"?taskHistory.codeSelectTask:"- -"} 次</label>
                                    </section>
                                    <div className="hold-icon"><i className="fa fa-tags"></i></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="well bg-theme">
                                <div className="widget-tile">
                                    <section>
                                        <h5><strong>账号续费</strong> 用户 </h5>
                                        <h2>{taskUsers&&taskUsers.result=="SUCCESS"?taskUsers.renewFeeUser:"- -"}</h2>
                                        <div className="progress progress-xs progress-white progress-over-tile">
                                            <div className="progress-bar  progress-bar-white" aria-valuemax="300000"
                                                 aria-valuenow={renewFeeWidth} style={{width: renewFeeWidth+"%"}}></div>
                                        </div>
                                        <label className="progress-label label-white"> 已账号续费共计 {taskHistory&&taskHistory.result=="SUCCESS"?taskHistory.renewFeeTask:"- -"} 次</label>
                                    </section>
                                    <div className="hold-icon"><i className="fa fa-dollar"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-lg-8">
                            <section className="panel corner-flip">
                                <div className="panel-body">
                                    <h3>系统操作统计</h3>
                                    <div className="row align-lg-center">
                                        <div className="col-sm-6">
                                            <div className="showcase showcase-pie-easy clearfix">
                                                <span className="easy-chart pull-left"
                                                      data-percent={delayOperationRate}
                                                      data-color="purple"
                                                      data-track-color="#EDEDED"
                                                      data-line-width="15"
                                                      data-size="140">
                                                    <span className="percent"
                                                          style={{lineHeight: "140px"}}>{delayOperationRate}</span>
                                                    <canvas height="175" width="175"
                                                            style={{
                                                                height: "140px",
                                                                width: "140px",
                                                                marginLeft:"-140px"
                                                            }}></canvas></span>
                                                <ul>
                                                    <li>{systemOperations&&systemOperations.result=="SUCCESS"?systemOperations.totalOperation:"- -"}
                                                        <small>操作任务总次数</small>
                                                    </li>
                                                    <li>{systemOperations&&systemOperations.result=="SUCCESS"?systemOperations.delayOperation:"- -"}
                                                        <small>延期操作次数</small>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="showcase showcase-chart-knob">
                                                <div className="clearfix">
                                                    <span>
                                                        <i className="fa fa-credit-card"
                                                           style={{color: "rgb(255, 140, 0)"}}></i>
                                                        <a href="#">已绑卡用户<small
                                                            style={{color: "rgb(255, 140, 0)"}}>{bindCardUsers&&bindCardUsers.result=="SUCCESS"?bindRate:"- -"}</small></a>
                                                    </span>
                                                    <span>
                                                        <i className="fa fa-question"
                                                           style={{color: "rgb(204, 204, 204)"}}></i>
                                                        <a href="#">未绑卡用户<small
                                                            style={{color: "rgb(204, 204, 204)"}}>{bindCardUsers&&bindCardUsers.result=="SUCCESS"?100-bindRate:"- -"}</small></a>
                                                    </span>
                                                </div>
                                                <div style={{display: "inline", width: "140px", height: "140px"}}>
                                                    <canvas width="175" height="175"
                                                            style={{width: "140px", height: "140px",marginLeft:"-126px"}}></canvas>
                                                    <input className="knob" data-animate="true"
                                                           data-displayinput="false"
                                                           data-thickness="0.2" data-width="140" data-height="140"
                                                           data-angleoffset="-125" data-anglearc="250"
                                                           data-color="darkorange" value={bindRate} readOnly="readonly"
                                                           style={{display: "none", width: "0", visibility: "hidden"}}/>
                                                </div>
                                                <h5><i className="fa fa-users" style={{marginLeft: "-19px"}}></i>
                                                    平台用户绑卡状态
                                                </h5>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </section>

                        </div>

                        <div className="col-lg-4">
                            <section className="panel" style={{height:"248px"}}>
                                <header className="panel-heading">
                                    <h3>当前提醒阈值设定</h3>
                                    <label className="color">如若提醒不准确，请到阈值设置菜单下进行提醒阈值信息调整</label>
                                </header>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <a href="#"><span className="badge pull-right">30 天</span>  提取流水</a>
                                    </li>
                                    <li className="list-group-item">
                                        <a href="#"><span className="badge pull-right">30 天</span> 后台选码</a>
                                    </li>
                                    <li className="list-group-item">
                                        <a href="#"><span className="badge pull-right">28 天</span> 账号续费</a>
                                    </li>
                                </ul>
                            </section>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="widget-timeline">
                                <ul>
                                    <li className="history">
                                        <span>
                                            {"历史记录"}
                                        </span>
                                    </li>
                                    {renderList(newTenTask, function (rows) {
                                        return rows.map(function (val, key) {
                                            if(key%2==0){
                                                return (
                                                    <li className="right" key={"timeline-"+key}>
                                                        <section>
                                                            <time><i className="fa fa-clock-o"></i>{formatDate(val.real_deal_date,"yyyy-mm-dd hh:MM:ss")}</time>
                                                            <h3>{historyStatus(val.status)}</h3>
                                                            <p>
                                                                用户：{val.userName} 计划处理时间：{formatDate(val.plan_deal_date,"yyyy-mm-dd")} 管理员：{val.adminName}
                                                            </p>
                                                        </section>
                                                    </li>
                                                )
                                            }else{
                                                return (
                                                    <li className="left" key={"timeline-"+key}>
                                                        <section>
                                                            <time><i className="fa fa-clock-o"></i>{formatDate(val.real_deal_date,"yyyy-mm-dd hh:MM:ss")}</time>
                                                            <h3>{historyStatus(val.status)}</h3>
                                                            <p>
                                                                用户：{val.userName} 计划处理时间：{formatDate(val.plan_deal_date,"yyyy-mm-dd")} 管理员：{val.adminName}
                                                            </p>
                                                        </section>
                                                    </li>
                                                )
                                            }
                                        });
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


function mapStateToProps(state) {
    const {getBindCardUsers,getOperations,getTaskUsers,getTaskHistory,getNewTenTask,commonReducer}=state;
    return {
        bindCardUsers: getBindCardUsers.data,
        taskUsers: getTaskUsers.data,
        taskHistory: getTaskHistory.data,
        systemOperations: getOperations.data,
        newTenTask:getNewTenTask.data
    }
}

export default connect(mapStateToProps)(HomeContainer);