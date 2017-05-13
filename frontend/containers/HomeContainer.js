/**
 * Created by Administrator on 2017/5/13.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router'
import BreadCrumb from '../components/BreadCrumb'

export default class HomeContainer extends Component {
    render() {
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
                                        <h2>8,590</h2>
                                        <div className="progress progress-xs progress-white progress-over-tile">
                                            <div className="progress-bar  progress-bar-white" aria-valuemax="10000"
                                                 aria-valuenow="8590" style={{width: "86%"}}></div>
                                        </div>
                                        <label className="progress-label label-white"> 已提取流水共计 <a href="#">3，366</a>
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
                                        <h2>478</h2>
                                        <div className="progress progress-xs progress-white progress-over-tile">
                                            <div className="progress-bar  progress-bar-white" aria-valuemax="1000"
                                                 aria-valuenow="478" style={{width: "48%"}}></div>
                                        </div>
                                        <label className="progress-label label-white"> 已后台选码共计 3，366 次</label>
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
                                        <h2>97,584</h2>
                                        <div className="progress progress-xs progress-white progress-over-tile">
                                            <div className="progress-bar  progress-bar-white" aria-valuemax="300000"
                                                 aria-valuenow="97584" style={{width: "33%"}}></div>
                                        </div>
                                        <label className="progress-label label-white"> 已账号续费共计 3，366 次</label>
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
                                                      data-percent="75"
                                                      data-color="purple"
                                                      data-track-color="#EDEDED"
                                                      data-line-width="15"
                                                      data-size="140">
                                                    <span className="percent"
                                                          style={{lineHeight: "140px"}}>75</span>
                                                    <canvas height="175" width="175"
                                                            style={{
                                                                height: "140px",
                                                                width: "140px",
                                                                marginLeft:"-140px"
                                                            }}></canvas></span>
                                                <ul>
                                                    <li>64,548
                                                        <small>操作任务总次数</small>
                                                    </li>
                                                    <li>3,984
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
                                                            style={{color: "rgb(255, 140, 0)"}}>75</small></a>
                                                    </span>
                                                    <span>
                                                        <i className="fa fa-question"
                                                           style={{color: "rgb(204, 204, 204)"}}></i>
                                                        <a href="#">未绑卡用户<small
                                                            style={{color: "rgb(204, 204, 204)"}}>25</small></a>
                                                    </span>
                                                </div>
                                                <div style={{display: "inline", width: "140px", height: "140px"}}>
                                                    <canvas width="175" height="175"
                                                            style={{width: "140px", height: "140px",marginLeft:"-127px"}}></canvas>
                                                    <input className="knob" data-animate="true"
                                                           data-displayinput="false"
                                                           data-thickness="0.2" data-width="140" data-height="140"
                                                           data-angleoffset="-125" data-anglearc="250"
                                                           data-color="darkorange" value="75" readOnly="readonly"
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

                </div>

            </div>
        )
    }
}


function mapStateToProps(state) {
    const {}=state
    return {}
}

export default connect(mapStateToProps)(HomeContainer)