import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router'
import {commonRefresh} from '../actions/Common'
import {EncodeBase64, deleteCookie} from '../frameworkHelper/FrameWorkUtils'


class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(function () {
            $("body").children("div").first().removeClass("mm-page");
        }, 1);
    }

    render() {
        return (
            <FrameWork />
        )
    }
}

class FrameWork extends Component {
    render() {
        return (
            <div>
                <LeftMenu />
                <div id="wrapper" className="mm-page">
                    <TopMenu />
                    <Main />
                </div>

            </div>
        )
    }
}

class LeftMenu extends Component {
    render() {
        return (
            <nav id="menu" data-search="close">
                <ul>
                    <li><a href="front/index.html"><i className="icon fa fa-users"></i> 会员信息 </a></li>
                    <li><span><i className="icon  fa  fa-tasks"></i> 处理任务</span>
                        <ul>
                            <li className="Label label-lg">流水提取 </li>
                            <li><a href="alwayMenu.html"> 后台选码 </a></li>
                            <li><a href="hideUserPanel.html"> 会员续费</a></li>
                        </ul>
                    </li>
                    <li><a href="front/index.html"><i className="icon  fa fa-bar-chart-o"></i> 统计分析（开发中） </a></li>
                    <li><a href="front/index.html"><i className="icon  fa fa-shield"></i> 权限分配（开发中） </a></li>

                </ul>
            </nav>
        )
    }
}

class RightMenu extends Component {
    render() {
        return (
            <nav id="menu-right">
                <ul>
                    <li className="Label label-lg">Theme color</li>
                    <li>
							<span className="text-center">
								<div id="style1" className="color-themes col1"></div>
								<div id="style2" className="color-themes col2"></div>
								<div id="style3" className="color-themes col3"></div>
								<div id="style4" className="color-themes col4"></div>
								<div id="none" className="color-themes col5"></div>
							</span>
                    </li>
                    <li className="Label label-lg">Contact Group</li>
                    <li data-counter-color="theme">
                        <span><i className="icon fa fa-smile-o"></i> Friends</span>
                        <ul>
                            <li className="Label">A</li>
                            <li className="img">
                                <a href="#" className="online">
                                    <img alt="" src="assets/photos_preview/50/people/1.jpg"/> Alexa
                                    <small>Johnson</small>
                                </a>
                            </li>
                            <li className="img">
                                <a href="#" className="busy">
                                    <img alt="" src="assets/photos_preview/50/people/2.jpg"/> Alexander
                                    <small>Brown</small>
                                </a>
                            </li>
                            <li className="Label">F</li>
                            <li className="img">
                                <a href="#">
                                    <img alt="" src="assets/photos_preview/50/people/3.jpg"/> Fred
                                    <small>Smith</small>
                                </a>
                            </li>
                            <li className="Label">J</li>
                            <li className="img">
                                <a href="#">
                                    <img alt="" src="assets/photos_preview/50/people/4.jpg"/> James
                                    <small>Miller</small>
                                </a>
                            </li>
                            <li className="img">
                                <a href="#">
                                    <img alt="" src="assets/photos_preview/50/people/5.jpg"/> Jefferson
                                    <small>Jackson</small>
                                </a>
                            </li>
                            <li className="img">
                                <a href="#">
                                    <img alt="" src="assets/photos_preview/50/people/6.jpg"/> Jordan
                                    <small>Lee</small>
                                </a>
                            </li>
                            <li className="Label">K</li>
                            <li className="img">
                                <a href="#" className="online">
                                    <img alt="" src="assets/photos_preview/50/people/7.jpg"/> Kim
                                    <small>Adams</small>
                                </a>
                            </li>
                            <li className="Label">M</li>
                            <li className="img">
                                <a href="#">
                                    <img alt="" src="assets/photos_preview/50/people/8.jpg"/> Meagan
                                    <small>Miller</small>
                                </a>
                            </li>
                            <li className="img">
                                <a href="#" className="busy">
                                    <img alt="" src="assets/photos_preview/50/people/9.jpg"/> Melissa
                                    <small>Johnson</small>
                                </a>
                            </li>
                            <li className="Label">N</li>
                            <li className="img">
                                <a href="#" className="online">
                                    <img alt="" src="assets/photos_preview/50/people/10.jpg"/> Nicole
                                    <small>Smith</small>
                                </a>
                            </li>
                            <li className="Label">S</li>
                            <li className="img">
                                <a href="#" className="online">
                                    <img alt="" src="assets/photos_preview/50/people/1.jpg"/> Samantha
                                    <small>Harris</small>
                                </a>
                            </li>
                            <li className="img">
                                <a href="#" className="block">
                                    <img alt="" src="assets/photos_preview/50/people/2.jpg"/> Scott
                                    <small>Thompson</small>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span><i className="icon  fa fa-home"></i> Family</span>
                        <ul>
                            <li className="Label">A</li>
                            <li className="img">
                                <a href="#" className="busy">
                                    <img alt="" src="assets/photos_preview/50/people/3.jpg"/> Adam
                                    <small>White</small>
                                </a>
                            </li>
                            <li className="Label">B</li>
                            <li className="img">
                                <a href="#" className="busy">
                                    <img alt="" src="assets/photos_preview/50/people/4.jpg"/> Ben
                                    <small>Robinson</small>
                                </a>
                            </li>
                            <li className="img">
                                <a href="#">
                                    <img alt="" src="assets/photos_preview/50/people/5.jpg"/> Bruce
                                    <small>Lee</small>
                                </a>
                            </li>
                            <li className="Label">E</li>
                            <li className="img">
                                <a href="#">
                                    <img alt="" src="assets/photos_preview/50/people/6.jpg"/> Eddie
                                    <small>Williams</small>
                                </a>
                            </li>
                            <li className="Label">J</li>
                            <li className="img">
                                <a href="#" className="online">
                                    <img alt="" src="assets/photos_preview/50/people/7.jpg"/> Jack
                                    <small>Johnson</small>
                                </a>
                            </li>
                            <li className="img">
                                <a href="#">
                                    <img alt="" src="assets/photos_preview/50/people/8.jpg"/> John
                                    <small>Jackman</small>
                                </a>
                            </li>
                            <li className="Label">M</li>
                            <li className="img">
                                <a href="#">
                                    <img alt="" src="assets/photos_preview/50/people/9.jpg"/> Martina
                                    <small>Thompson</small>
                                </a>
                            </li>
                            <li className="img">
                                <a href="#" className="busy">
                                    <img alt="" src="assets/photos_preview/50/people/10.jpg"/> Matthew
                                    <small>Watson</small>
                                </a>
                            </li>
                            <li className="Label">O</li>
                            <li className="img">
                                <a href="#" className="online">
                                    <img alt="" src="assets/photos_preview/50/people/1.jpg"/> Olivia
                                    <small>Taylor</small>
                                </a>
                            </li>
                            <li className="img">
                                <a href="#" className="online">
                                    <img alt="" src="assets/photos_preview/50/people/2.jpg"/> Owen
                                    <small>Wilson</small>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li data-counter-color="theme-inverse">
                        <span><i className="icon  fa fa-briefcase"></i> Work colleagues</span>
                        <ul>
                            <li className="Label">D</li>
                            <li className="img">
                                <a href="#">
                                    <img alt="" src="assets/photos_preview/50/people/3.jpg"/> David
                                    <small>Harris</small>
                                </a>
                            </li>
                            <li className="img">
                                <a href="#">
                                    <img alt="" src="assets/photos_preview/50/people/4.jpg"/> Dennis
                                    <small>King</small>
                                </a>
                            </li>
                            <li className="Label">E</li>
                            <li className="img">
                                <a href="#" className="online">
                                    <img alt="" src="assets/photos_preview/50/people/5.jpg"/> Eliza
                                    <small>Walker</small>
                                </a>
                            </li>
                            <li className="Label">L</li>
                            <li className="img">
                                <a href="#" className="busy">
                                    <img alt="" src="assets/photos_preview/50/people/6.jpg"/> Larry
                                    <small>Turner</small>
                                </a>
                            </li>
                            <li className="img">
                                <a href="#" className="online">
                                    <img alt="" src="assets/photos_preview/50/people/7.jpg"/> Lisa<br />
                                    <small>Wilson</small>
                                </a>
                            </li>
                            <li className="Label">M</li>
                            <li className="img">
                                <a href="#">
                                    <img alt="" src="assets/photos_preview/50/people/8.jpg"/> Michael
                                    <small>Jordan</small>
                                </a>
                            </li>
                            <li className="Label">R</li>
                            <li className="img">
                                <a href="#">
                                    <img alt="" src="assets/photos_preview/50/people/9.jpg"/> Rachelle
                                    <small>Cooper</small>
                                </a>
                            </li>
                            <li className="img">
                                <a href="#" className="online">
                                    <img alt="" src="assets/photos_preview/50/people/10.jpg"/> Rick
                                    <small>James</small>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="Label label-lg">Total week Earnings</li>
                    <li>
                        <span><i className="icon  fa fa-bar-chart-o"></i> See This week</span>
                        <ul>
                            <li className="Label">themeforest</li>
                            <li><span><i className="label label-warning pull-right">HTML</i> Earnings $395 </span></li>
                            <li><span> Earnings $485 </span></li>
                            <li><span><i className="label label-info pull-right">Wordpress</i> Earnings $1,589 </span>
                            </li>
                            <li className="Label">codecanyon</li>
                            <li><span><i className="label label-danger pull-right">Item 6537086</i> Earnings $897</span>
                            </li>
                            <li><span>Sunday Earnings $395</span></li>
                            <li className="Label">Other</li>
                            <li><span><i
                                className="label label-success  pull-right">up 35%</i> Total Earnings $5,025</span></li>
                        </ul>
                    </li>
                    <li>
								<span>
									<div className="widget-mini-chart align-xs-right">
											<div className="pull-left">
													<div className="sparkline mini-chart" data-type="bar"
                                                         data-color="warning" data-bar-width="10" data-height="45">2,3,7,5,4,6,6,3</div>
											</div>
											<p>This week Earnings</p>
											<h4>$11,987</h4>
									</div>
								</span>
                    </li>
                    <li className="Label label-lg">Processing</li>
                    <li>
								<span>
									<p>Server Processing</p>
									<div className="progress progress-dark progress-stripes progress-xs">
											<div className="progress-bar bg-danger" ></div>
									</div>
									<label className="progress-label">Today , CPU 37%</label>
                                    <div className="progress progress-dark progress-xs">
											<div className="progress-bar bg-warning"></div>
									</div>
									<label className="progress-label lasted">Today , Server load  22.85%</label>
								</span>
                    </li>
                    <li className="Label label-lg">Quick Friends Chat</li>
                    <li className="img">
                        <a href="#" className="online">
                            <img alt="" src="assets/photos_preview/50/people/1.jpg"/> Olivia
                            <small>Taylor</small>
                        </a>
                    </li>
                    <li className="img">
                        <a href="#" className="online">
                            <img alt="" src="assets/photos_preview/50/people/2.jpg"/> Owen
                            <small>Wilson</small>
                        </a>
                    </li>
                    <li className="img">
                        <a href="#">
                            <img alt="" src="assets/photos_preview/50/people/8.jpg"/> Meagan
                            <small>Miller</small>
                        </a>
                    </li>
                    <li className="img">
                        <a href="#" className="busy">
                            <img alt="" src="assets/photos_preview/50/people/9.jpg"/> Melissa
                            <small>Johnson</small>
                        </a>
                    </li>
                    <li className="img">
                        <a href="#" className="online">
                            <img alt="" src="assets/photos_preview/50/people/5.jpg"/> Samantha
                            <small>Harris</small>
                        </a>
                    </li>
                    <li className="Label label-lg">visitors Real Time</li>
                    <li>
								<span>
									<div className="widget-chart">
											<div id="realtimeChart" className="demo-placeholder"
                                                 style={{height:"150px"}}></div>
											<div id="realtimeChartCount" className="align-lg-center"><span>0</span> visitors on site </div>
									</div>
								</span>
                    </li>
                </ul>
            </nav>
        )
    }
}

class TopMenu extends Component {
    render() {
        return (
            <div>
                <div id="header" style={{borderBottom: "5px #0aa699 solid"}}>

                    <div className="logo-area clearfix">
                        <a href="#" className="logo"></a>
                    </div>

                    <div className="tools-bar">
                        <ul className="nav navbar-nav nav-main-xs">
                            <li><a href="#" className="icon-toolsbar nav-mini"><i className="fa fa-bars"></i></a></li>
                        </ul>
                        <ul className="nav navbar-nav nav-top-xs hidden-xs tooltip-area">
                            <li className="h-seperate"></li>
                            <li><a href="#" data-toggle="tooltip" title="系统主面板" data-container="body"
                                   data-placement="bottom"><i className="fa fa-home"></i></a></li>
                            <li className="h-seperate"></li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown">今日总任务数 ： <span className="badge bg-danger" style={{position:"relative",top:"-2px"}}>41</span></a>
                                <ul className="dropdown-menu arrow animated fadeInDown fast" style={{fontSize:"12px"}}>
                                    <li><a href="#"> 流水提取任务 <span className="badge bg-info pull-right" style={{position:"relative",marginTop:"3px"}}>12</span></a></li>
                                    <li><a href="#"> 后台选码任务 </a></li>
                                    <li><a href="#"> 会员续费任务 <span className="badge bg-info pull-right" style={{position:"relative",marginTop:"3px"}}>29</span></a></li>
                                </ul>
                            </li>
                            <li className="h-seperate"></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right tooltip-area">
                            <li>
                                <button className="btn btn-circle btn-header-search"><i className="fa fa-search"></i>
                                </button>
                            </li>
                            <li><a href="#" className="nav-collapse avatar-header">
                                <img alt="" src="assets/img/avatar.png" className="circle"/>
                                <span className="badge">3</span>
                            </a>
                            </li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown">
                                    <em><strong>Hi</strong>, Nutprawee </em> <i
                                    className="dropdown-icon fa fa-angle-down"></i>
                                </a>
                                <ul className="dropdown-menu pull-right icon-right arrow">
                                    <li><a href="#"><i className="fa fa-user"></i> Profile</a></li>
                                    <li><a href="#"><i className="fa fa-cog"></i> Setting </a></li>
                                    <li><a href="#"><i className="fa fa-bookmark"></i> Bookmarks</a></li>
                                    <li><a href="#"><i className="fa fa-money"></i> Make a Deposit</a></li>
                                    <li className="divider"></li>
                                    <li><a href="#"><i className="fa fa-sign-out"></i> Signout </a></li>
                                </ul>
                            </li>
                            <li className="visible-lg">
                                <a href="#" className="h-seperate fullscreen" data-toggle="tooltip" title="Full Screen"
                                   data-container="body" data-placement="left">
                                    <i className="fa fa-expand"></i>
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
                <div id="nav">
                    <div id="nav-title">
                        <h3><strong>Hi</strong>, Nutprawee</h3>
                    </div>
                    <div id="nav-scroll">
                        <div className="avatar-slide">

								<span className="easy-chart avatar-chart" data-color="theme-inverse" data-percent="69"
                                      data-track-color="rgba(255,255,255,0.1)" data-line-width="5" data-size="118">
										<span className="percent"></span>
										<img alt="" src="assets/img/avatar.png" className="circle"/>
								</span>

                            <div className="avatar-detail">
                                <p>
                                    <button className="btn btn-inverse btn-sm"><i className="fa fa-pencil"></i> Edit
                                        Profile
                                    </button>
                                </p>
                                <p><a href="#">@ Chaing Mai , TH</a></p>
                                <span>12,110 Sales</span>
                                <span>106 Follower</span>
                            </div>

                            <div className="avatar-link btn-group btn-group-justified">
                                <a className="btn" href="profile.html" title="Portfolio"><i
                                    className="fa fa-briefcase"></i></a>
                                <a className="btn" data-toggle="modal" href="#md-notification" title="Notification">
                                    <i className="fa fa-bell-o"></i><em className="green"></em>
                                </a>
                                <a className="btn" data-toggle="modal" href="#md-messages" title="Messages">
                                    <i className="fa fa-envelope-o"></i><em className="active"></em>
                                </a>
                                <a className="btn" href="#menu-right" title="Contact List"><i
                                    className="fa fa-book"></i></a>
                            </div>

                        </div>


                        <div className="widget-collapse dark">
                            <header>
                                <a data-toggle="collapse" href="#collapseSummary"><i
                                    className="collapse-caret fa fa-angle-up"></i> Summary Order </a>
                            </header>
                            <section className="collapse in" id="collapseSummary">
                                <div className="collapse-boby" style={{padding: "0"}}>

                                    <div className="widget-mini-chart align-xs-left">
                                        <div className="pull-right">
                                            <div className="sparkline mini-chart" data-type="bar" data-color="theme"
                                                 data-bar-width="10" data-height="35">2,3,4,5,7,4,5
                                            </div>
                                        </div>
                                        <p>This week's balance</p>
                                        <h4>$12,788</h4>
                                    </div>

                                    <div className="widget-mini-chart align-xs-right">
                                        <div className="pull-left">
                                            <div className="sparkline mini-chart" data-type="bar" data-color="warning"
                                                 data-bar-width="10" data-height="45">2,3,7,5,4,6,6,3
                                            </div>
                                        </div>
                                        <p>This week sales</p>
                                        <h4>1,325 item</h4>
                                    </div>

                                </div>

                            </section>
                        </div>


                        <div className="widget-collapse dark">
                            <header>
                                <a data-toggle="collapse" href="#collapseTasks"><i
                                    className="collapse-caret fa fa-angle-down"></i> (2) Tasks processing </a>
                            </header>
                            <section className="collapse" id="collapseTasks">

                                <div className="collapse-boby">

                                    <div className="widget-slider">
                                        <p>Upload status</p>
                                        <div className="progress progress-dark progress-xs tooltip-in">
                                            <div className="progress-bar bg-darkorange"
                                            ></div>
                                        </div>
                                        <label className="progress-label">Master.zip 4 / 5 </label>

                                        <div className="progress progress-dark progress-xs">
                                            <div className="progress-bar bg-theme-inverse"
                                            ></div>
                                        </div>
                                        <label className="progress-label lasted">Profile 2 / 5 </label>

                                    </div>

                                </div>

                            </section>
                        </div>


                        <div className="widget-collapse dark">
                            <header>
                                <a data-toggle="collapse" href="#collapseSetting"><i
                                    className="collapse-caret fa fa-angle-up"></i> Setting Option </a>
                            </header>
                            <section className="collapse in" id="collapseSetting">
                                <div className="collapse-boby" style={{padding: "0"}}>

                                    <ul className="widget-slide-setting">
                                        <li>
                                            <div className="ios-switch theme pull-right">
                                                <div className="switch"><input type="checkbox" name="option"/></div>
                                            </div>
                                            <label>Switch <span>OFF</span></label>
                                            <small>Lorem ipsum dolor sit amet</small>
                                        </li>
                                        <li>
                                            <div className="ios-switch theme-inverse pull-right">
                                                <div className="switch"><input type="checkbox" name="option_1"/>
                                                </div>
                                            </div>
                                            <label>Switch <span>ON</span></label>
                                            <small>Lorem ipsum dolor sit amet</small>
                                        </li>
                                    </ul>

                                </div>

                            </section>
                        </div>


                    </div>
                </div>
                <div className="widget-top-search">
                    <span className="icon"><a href="#" className="close-header-search"><i
                        className="fa fa-times"></i></a></span>
                    <form id="top-search">
                        <h2><strong>Quick</strong> Search</h2>
                        <div className="input-group">
                            <input type="text" name="q" placeholder="Find something..." className="form-control"/>
                            <span className="input-group-btn">
							<button className="btn" type="button" title="With Sound"><i
                                className="fa fa-microphone"></i></button>
							<button className="btn" type="button" title="Visual Keyboard"><i
                                className="fa fa-keyboard-o"></i></button>
							<button className="btn" type="button" title="Advance Search"><i
                                className="fa fa-th"></i></button>
							</span>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

class Main extends Component {
    componentDidMount(){
    }
    render() {
        return (
            <div id="main">

                <div id="content">

                    <div className="row">

                        <div className="col-lg-8">

                        </div>

                        <div className="col-lg-4"></div>

                    </div>

                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const {commonReducer}=state
    return {
        refresh: commonReducer.refresh,
    }
}

export default connect(mapStateToProps)(App)