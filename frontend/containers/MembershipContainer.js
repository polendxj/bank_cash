/**
 * Created by Administrator on 2017/5/13.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import BreadCrumb from '../components/BreadCrumb'
import FilterPanel from '../components/FilterPanel'
import Operations from '../components/Operations'
import Search from '../components/Search'
import Pagenation from '../components/Pagenation'
import {commonRefresh} from '../actions/Common'
import {operation_notification, ConfirmModal} from '../businessHelper/BusinessUtils'


export default class MembershipContainer extends Component {
    constructor(props) {
        super(props);
        /*attribute*/
        this.page = 0;
        this.optPage = business_operation_action.LIST; //0-list,1-add,2-edit
        this.operationStatus = business_operation_status.INIT;   //0-init,1-doing,2-success,3-error
        this.oldComponent = ""; //保存上一次的component渲染界面
        this.selectedItems = [{key: "001", value: "景鹏"}, {key: "002", value: "郑杰"}]; //保存选择的条目
        /*event*/
        this._startRefresh = this._startRefresh.bind(this);
        this._changePage = this._changePage.bind(this);
        this._prePage = this._prePage.bind(this);
        this._nextPage = this._nextPage.bind(this);
        this._doAction = this._doAction.bind(this);
    }

    componentDidMount() {
        $("#mailbox .opt").find("a").on("click", function () {
            $("#mailbox .opt").find("a").removeClass("active");
            $(this).addClass("active");
            var idx = $(this).index();
            switch (idx) {
                case 0:
                    $("#teamEdit").fadeOut(function () {
                        $(".teamInput").hide();
                    });
                    $("#teamSearch").fadeOut(function () {
                        $(".teamInput").hide();
                    });
                    break;
                case 1:
                    $("#teamSearch").fadeOut(function () {
                        $("#teamEdit").fadeIn();
                        $(".teamInput").show();
                    });
                    break;
                case 2:
                    $("#teamEdit").fadeOut(function () {
                        $("#teamSearch").fadeIn();
                        $(".teamInput").hide();
                    });
                    break;
            }
        });

        $(".teamResult li").click(function () {
            $(".teamResult li").css({backgroundColor: "transparent"});
            $(this).animate({backgroundColor: "#F1F3F5"}, "fast");
        });
    }

    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }

    _changePage(page) {
        this.page = page;
        this._startRefresh();
    }

    _prePage(page) {
        this.page = this.page - 1;
        this._startRefresh();
    }

    _nextPage(page) {
        this.page = this.page + 1;
        this._startRefresh();
    }

    _doAction(optType) {
        this.optPage = optType;
        switch (this.optPage) {
            case business_operation_action.SAVE:
                this.operationStatus = business_operation_status.DOING;
                setTimeout(function () {
                    this.operationStatus = business_operation_status.SUCCESS;
                    this.optPage = business_operation_action.LIST;
                    operation_notification(1);
                    this._startRefresh();
                }.bind(this), 3000);
                break;
            case business_operation_action.ADD:
                this.operationStatus = business_operation_status.INIT;
                break;
            case business_operation_action.EDIT:
                this.operationStatus = business_operation_status.INIT;
                break;
            case business_operation_action.DELETE:
                this.operationStatus = business_operation_status.DOING;
                setTimeout(function () {
                    this.operationStatus = business_operation_status.ERROR;
                    operation_notification(0, "不允许删除");
                    this._startRefresh();
                }.bind(this), 3000);
                break;
        }
        this._startRefresh();
    }

    render() {
        const {}=this.props;
        var component = "";
        switch (this.optPage) {
            case "LIST":
                component =
                    <div className="row">
                        <Pagenation counts={10}
                                    page={this.page}
                                    _changePage={this._changePage} _prePage={this._prePage}
                                    _nextPage={this._nextPage}/>
                        <MembershipList/>
                    </div>;
                break;
            case "ADD":
                component =
                    <div className="row">
                        <AddUser />
                    </div>
                break;
            case "EDIT":
                break;
            default:
                component = this.oldComponent;
                break;
        }
        this.oldComponent = component;
        return (
            <div>
                <Search type="0"/>
                <div id="main">
                    <BreadCrumb titles={["会员信息"]}/>
                    <div id="mailbox" style={{top: "35px"}}>
                        <div id="nav-scroll">
                            <div className="mail-list">
                                <header style={{padding: "4px 0"}}>
                                    <h2 className="header-text">团队 </h2>
                                    <div className="btn-group btn-group-justified opt">
                                        <a href="javascript:void(0)" className="btn btn-inverse btn-transparent "><i
                                            className="fa fa-users"></i></a>
                                        <a href="javascript:void(0)" className="btn btn-inverse btn-transparent  "><i
                                            className="fa fa-edit"></i></a>
                                        <a href="javascript:void(0)" className="btn btn-inverse btn-transparent"><i
                                            className="fa fa-search"></i></a>
                                    </div>
                                    <div >
                                        <div id="teamSearch" style={{display: "none", marginTop: "5px"}}>
                                            <input type="text" placeholder="请输入团队负责人进行搜索..." className="form-control"/>
                                        </div>
                                        <div id="teamEdit"
                                             style={{display: "none", marginTop: "5px", textAlign: "right"}}>
                                            <button type="button" className="btn btn-default btn-xs"
                                                    style={{marginRight: "2px"}}>取 消
                                            </button>
                                            <button type="button" className="btn btn-danger btn-xs"><i
                                                className="fa fa-trash-o"></i> 删除 0 项
                                            </button>
                                        </div>
                                    </div>
                                </header>
                                <ul className="mlist teamResult">
                                    <li>
                                        <div style={{width: "5%", float: "left"}}><input type="checkbox"
                                                                                         className="form-control teamInput"
                                                                                         style={{
                                                                                             marginTop: "-5px",
                                                                                             display: "none"
                                                                                         }}/></div>
                                        <div style={{width: "85%", paddingLeft: "30px"}}>
                                            <h5><a href="#">景鹏</a></h5>
                                            <time className="timeago" dateTime="2017-6-5" title="2017-6-5">2017-6-5
                                            </time>
                                            <label data-color="red"></label>
                                        </div>
                                        <div style={{float: "right", marginTop: "-37px"}}></div>
                                    </li>
                                    <li>
                                        <div style={{width: "5%", float: "left"}}><input type="checkbox"
                                                                                         className="form-control teamInput"
                                                                                         style={{
                                                                                             marginTop: "-5px",
                                                                                             display: "none"
                                                                                         }}/></div>
                                        <div style={{width: "85%", paddingLeft: "30px"}}>
                                            <h5><a href="#">郑杰</a></h5>
                                            <time className="timeago" dateTime="2017-6-5" title="2017-6-5">2017-6-5
                                            </time>
                                        </div>
                                        <div style={{float: "right", marginTop: "-37px"}}></div>
                                    </li>
                                </ul>
                                <footer>
                                    <div className="pull-right">
                                        <span className="mail-pagination">1-50 of 685</span>
                                        <ul className="pagination">
                                            <li><a href="#"><i className="fa fa-angle-left"></i></a></li>
                                            <li><a href="#"><i className="fa fa-angle-right"></i></a></li>
                                        </ul>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </div>
                    <div id="content" className="after-mail-box" style={{top: "75px", padding: "15px 18px 0"}}>
                        <Operations title="景鹏" smallTitle="团队" operationStatus={this.operationStatus}
                                    selectedItems={this.selectedItems} _startRefresh={this._startRefresh}
                                    _doAction={this._doAction}/>
                        <div className="row" style={{
                            display: this.optPage == (business_operation_action.LIST || business_operation_action.SEARCH) ? "block" : "none"
                        }}>
                            <FilterPanel conditions={[{key: "用户名", value: "景鹏,郑杰"}, {key: "密码", value: "6656724"}]}
                                         sortColumn="绑卡时间" sortRule="降序" _startRefresh={this._startRefresh}/>
                        </div>
                        {component}
                    </div>
                </div>

            </div>

        )
    }
}

class MembershipList extends Component {
    render() {
        return (
            <section className="panel" style={{marginBottom: "-1px"}}>
                <div className="panel-body" style={{padding: "1px"}}>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>姓名</th>
                            <th>ID</th>
                            <th>用户名</th>
                            <th>邮箱</th>
                            <th>报单日期</th>
                            <th>绑卡日期</th>
                            <th>虚拟卡</th>
                            <th>银行卡</th>
                            <th>续费日期</th>
                        </tr>
                        </thead>
                        <tbody className="text-center">
                        <tr>
                            <td><input type="checkbox" value={true}/></td>
                            <td>陈乃永</td>
                            <td>11227942</td>
                            <td>chny158</td>
                            <td>m678cny000.com</td>
                            <td>2017-3-12</td>
                            <td>2017-5-5</td>
                            <td><span className="label bg-primary">已办卡</span></td>
                            <td><span className="label bg-danger">未上传</span></td>
                            <td>2017-5-5</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        )
    }
}

class AddUser extends Component {
    render() {
        return (
            <section className="panel">
                <div className="panel-body" style={{padding: "1px"}}>
                    <div className="row">
                        <div className="col-md-12" style={{padding: "5px 25px"}}>
                            <br />
                            <h3><strong>基本</strong> 信息</h3>
                            <hr />
                            <form>
                                <div className="form-group">
                                    <label className="control-label">User name</label>
                                    <input type="text" className="form-control" placeholder="8-15 Characters"/>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6">
                                        <label className="control-label">Full Name</label>
                                        <input type="text" className="form-control" id="fullname"
                                               placeholder="Your full name"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="control-label">Last Name</label>
                                        <input type="text" className="form-control" placeholder="Your last name"/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}


function mapStateToProps(state) {
    const {commonReducer}=state
    return {
        refresh: commonReducer.refresh,
    }
}

export default connect(mapStateToProps)(MembershipContainer)