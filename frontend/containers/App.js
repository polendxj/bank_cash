import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router'
import {commonRefresh} from '../actions/Common'
import {EncodeBase64, ErrorModal, deleteCookie, Loading} from '../components/Tool/Tool'


class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(function () {
            console.log($("body").children("div").first().removeClass("mm-page"));

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

class LeftMenu extends Component{
    render(){
        return(
            <nav id="menu" data-search="close">
                <ul>
                    <li><span><i className="icon  fa fa-laptop"></i> Dashboard</span>
                        <ul>
                            <li><a href="dashboard.html"><i className="icon  fa fa-rocket"></i> First Design </a>
                            </li>
                            <li><a href="dashboard2.html"><i className="icon  fa fa-th"></i> Dashboard New </a></li>
                        </ul>
                    </li>
                    <li><a href="front/index.html"><i className="icon  fa fa-rocket"></i> Front End </a></li>
                    <li><span><i className="icon  fa fa-th-list"></i> Layout</span>
                        <ul>
                            <li className="Label label-lg">Main Layout</li>
                            <li><a href="alwayMenu.html"> Alway Left Menu </a></li>
                            <li><a href="hideUserPanel.html"> Hide User Panel </a></li>
                            <li><a href="hideUserPanelIn.html"> Show & Hide</a></li>
                            <li className="Label label-lg">Other Layout</li>
                            <li><a href="topMenu.html"> Top Menu</a></li>
                            <li><a href="footerShow.html"> Footer Show</a></li>
                            <li><a href="footerMenu.html"> Footer with menu</a></li>
                        </ul>
                    </li>
                    <li><a href="mailBox.html"><i className="icon  fa fa-inbox"></i> Mail</a></li>
                    <li><span><i className="icon  fa fa-briefcase"></i> UI Element</span>
                        <ul>
                            <li><a href="ui.html"> UI </a></li>
                            <li><a href="ui_button.html"> Button </a></li>
                            <li><a href="ui_icon.html"> Fonts Icon</a></li>
                            <li><a href="ui_slide.html"> Slide</a></li>
                            <li><a href="ui_modal.html"> Modal</a></li>
                            <li><a href="ui_panel.html"> Panel</a></li>
                            <li><a href="ui_alert.html"> Alert</a></li>
                            <li><a href="ui_typography.html"> Typography</a></li>
                            <li><a href="ui_nestable.html"> Nestable</a></li>
                        </ul>
                    </li>
                    <li><span><i className="icon  fa fa-bar-chart-o"></i> Chart </span>
                        <ul>
                            <li><a href="chartFlot.html"> Flot Chart</a></li>
                            <li><a href="chartMorris.html"> Morris Chart</a></li>
                            <li><a href="chartOther.html"> Other Chart</a></li>
                        </ul>
                    </li>
                    <li><a href="calendar.html"><i className="icon  fa fa-calendar-o"></i> Calendar </a></li>

                </ul>
            </nav>
        )
    }
}

class TopMenu extends Component{
    render(){
        return(
            <div>
                <div id="header">

                    <div className="logo-area clearfix">
                        <a href="#" className="logo"></a>
                    </div>

                    <div className="tools-bar">
                        <ul className="nav navbar-nav nav-main-xs">
                            <li><a href="#" className="icon-toolsbar nav-mini"><i className="fa fa-bars"></i></a></li>
                        </ul>
                        <ul className="nav navbar-nav nav-top-xs hidden-xs tooltip-area">
                            <li className="h-seperate"></li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"><i
                                    className="fa fa-th-large"></i></a>
                                <ul className="dropdown-menu arrow animated fadeInDown fast">
                                    <li><a href="#"> Profile</a></li>
                                    <li><a href="#"> Setting </a></li>
                                    <li><a href="#"> Bookmarks</a></li>
                                    <li><a href="#"> Make a Deposit</a></li>
                                    <li className="divider"></li>
                                    <li className="dropdown-submenu"><a tabIndex="-1" href="#">multi level
                                        options &nbsp; <i className="fa fa-angle-right"></i></a>
                                        <ul className="dropdown-menu  animated fadeInRight fast">
                                            <li><a tabIndex="-1" href="#">Second level</a></li>
                                            <li><a href="#">Second level</a></li>
                                            <li><a href="#">Second level</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className="h-seperate"></li>
                            <li><a href="#" data-toggle="tooltip" title="View front end" data-container="body"
                                   data-placement="bottom"><i className="fa fa-laptop"></i></a></li>
                            <li className="h-seperate"></li>
                            <li><a href="#"> Online Store </a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right tooltip-area">
                            <li><a href="#menu-right" data-toggle="tooltip" title="Right Menu" data-container="body"
                                   data-placement="left"><i className="fa fa-align-right"></i></a></li>
                            <li className="hidden-xs hidden-sm"><a href="#" className="h-seperate">Help</a></li>
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
                                <div className="collapse-boby" style={{padding:"0"}}>

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
                                <div className="collapse-boby" style={{padding:"0"}}>

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
                                                <div className="switch"><input type="checkbox" name="option_1" />
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

class Main extends Component{
    render(){
        return(
            <div id="main">

                <ol className="breadcrumb">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Library</a></li>
                    <li className="active">Data</li>
                </ol>

                <div id="content">

                    <div className="row">

                        <div className="col-lg-8"></div>

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