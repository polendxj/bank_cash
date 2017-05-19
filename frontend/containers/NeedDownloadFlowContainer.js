/**
 * Created by Administrator on 2017/5/13.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import BreadCrumb from '../components/BreadCrumb'
import FilterPanel from '../components/FilterPanel'
import Operations from '../components/Operations'
// import Search from '../components/Search'
import Pagenation from '../components/Pagenation'
import {commonRefresh} from '../actions/Common'
import {operation_notification, ConfirmModal, renderList, formatDate} from '../businessHelper/BusinessUtils'
import {protectInputTooFast, array2Json} from '../frameworkHelper/FrameWorkUtils'
import {getListByMutilpCondition, deleteObject, getDetail, saveObject} from '../actions/CommonActions'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import {
    USER_DELETE_END, USER_DELETE_START,
    USER_DETAIL_END, USER_DETAIL_START,
    USER_LIST_END, USER_LIST_START,
    USER_SAVE_END, USER_SAVE_START,
    USER_MANAGER_LIST_END, USER_MANAGER_LIST_START,
    USER_COUNT_OF_MANAGER_START, USER_COUNT_OF_MANAGER_END
} from '../constants/index'


export default class NeedDownloadFlowContainer extends Component {
    constructor(props) {
        super(props);
        /*attribute*/
        this.page = 0;
        this.optPage = business_operation_action.LIST; //0-list,1-add,2-edit
        this.operationStatus = business_operation_status.INIT;   //0-init,1-doing,2-success,3-error
        this.oldComponent = ""; //保存上一次的component渲染界面
        this.selectedItems = []; //保存选择的条目
        this.imageUploadStatus = 0;    //0-未上传，1-正在上传，2-上传成功，3-上传失败
        this.imageUploadPath = "";    //图片上传返回来的路径
        this.selectedManager = "";      //选择的团队负责人
        this.deletingManager = [];
        /*event*/
        this._startRefresh = this._startRefresh.bind(this);
        this._changePage = this._changePage.bind(this);
        this._prePage = this._prePage.bind(this);
        this._nextPage = this._nextPage.bind(this);
        this._doAction = this._doAction.bind(this);
        this._changeManager = this._changeManager.bind(this);
        this._searchManagerByName = this._searchManagerByName.bind(this);
        this._getAllManager = this._getAllManager.bind(this);
        this._changeImageUploadStatus = this._changeImageUploadStatus.bind(this);
        this._changeSelectedItems = this._changeSelectedItems.bind(this);
        this._changeSelectedManager = this._changeSelectedManager.bind(this);
        this._deleteManager = this._deleteManager.bind(this);
    }

    componentDidMount() {
        var self = this;
        /*jQuery Operation*/
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
        $("#cancel").on("click", function () {
            $("#mailbox .opt").find("a").removeClass("active");
            $("#mailbox .opt").find("a").eq(2).addClass("active");
            $("#teamEdit").fadeOut(function () {
                $("#teamSearch").fadeIn();
                $(".teamInput").hide();
            });
            // self.deletingManager.splice(0);
            self._startRefresh();
        });
        /*Init Load Data*/
        this.props.dispatch(getListByMutilpCondition({
            "page": 0,
            "pageSize": page_size,
            "is_manager": 1
        }, USER_MANAGER_LIST_START, USER_MANAGER_LIST_END, user_list, function (json) {
            if (json.count > 0) {
                self.props.dispatch(getListByMutilpCondition({
                    "page": 0,
                    "pageSize": page_size,
                    "manager_id": json.rows[0].id,
                    "flow_record_status": 1
                }, USER_LIST_START, USER_LIST_END, user_list));
            }
        }));
        this.props.dispatch(getListByMutilpCondition({"flow_record_status": 1}, USER_COUNT_OF_MANAGER_START, USER_COUNT_OF_MANAGER_END, user_count_of_manager));

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
        var self = this;
        this.optPage = optType;
        switch (this.optPage) {
            case business_operation_action.SAVE: //此处响应发送邮件的事件
                this.operationStatus = business_operation_status.DOING;
                setTimeout(function () {
                    self.operationStatus = business_operation_status.SUCCESS;
                    self.optPage = business_operation_action.LIST;
                    operation_notification(1);
                    self._startRefresh();
                },3000);

                break;
            case business_operation_action.ADD:
                this.operationStatus = business_operation_status.INIT;
                break;
            case business_operation_action.EDIT:
                this.operationStatus = business_operation_status.INIT;
                self.props.dispatch(getListByMutilpCondition({
                    "page": 0,
                    "pageSize": page_size,
                    "id": self.selectedItems[0]
                }, USER_DETAIL_START, USER_DETAIL_END, user_list));
                break;
            case business_operation_action.DELETE:  //此处响应确认完成的事件
                this.operationStatus = business_operation_status.DOING;
                setTimeout(function () {
                    self.operationStatus = business_operation_status.SUCCESS;
                    operation_notification(1);
                    self._startRefresh();
                },3000);
                break;
            case business_operation_action.LIST:
                this.selectedItems.splice(0);
                break;
        }
        this._startRefresh();
    }

    _changeManager(id) {
        this.selectedManager = id;
        this.props.dispatch(getListByMutilpCondition({
            "page": 0,
            "pageSize": page_size,
            "manager_id": id,
            "flow_record_status": 1
        }, USER_LIST_START, USER_LIST_END, user_list));
    }

    _searchManagerByName(name) {
        this.props.dispatch(getListByMutilpCondition({
            "page": 0,
            "pageSize": page_size,
            "is_manager": 1,
            "name": name
        }, USER_MANAGER_LIST_START, USER_MANAGER_LIST_END, user_list));
    }

    _getAllManager() {
        this.props.dispatch(getListByMutilpCondition({
            "page": 0,
            "pageSize": page_size,
            "is_manager": 1
        }, USER_MANAGER_LIST_START, USER_MANAGER_LIST_END, user_list));
    }

    _changeImageUploadStatus(status, path) {
        this.imageUploadStatus = status;
        this.imageUploadPath = path;
        this._doAction(business_operation_action.SAVE);
    }

    _changeSelectedItems(id) {
        var self = this;
        this.selectedItems.splice(0);
        $('input[name=' + id + ']:checked').each(function () {
            self.selectedItems.push($(this).val());
        });
        this._startRefresh();
    }

    _changeSelectedManager(id) {
        var self = this;
        this.deletingManager.splice(0);
        $('input[name=' + id + ']:checked').each(function () {
            self.deletingManager.push($(this).val());
        });
        this._startRefresh();
    }

    _deleteManager() {
        var self = this;
        this.props.dispatch(deleteObject({
            managerIds: self.deletingManager
        }, USER_DELETE_START, USER_DELETE_END, user_delete_manager, function (json) {
            self.deletingManager.splice(0);
            self._getAllManager();
        }));
    }

    render() {
        const {userManagerList, userListByManager, userDetail, userCountOfManager}=this.props;
        var component = "";
        switch (this.optPage) {
            case business_operation_action.DELETE:
            case business_operation_action.LIST:
                component =
                    <div className="row">
                        <Pagenation counts={10}
                                    page={this.page}
                                    _changePage={this._changePage} _prePage={this._prePage}
                                    _nextPage={this._nextPage}/>
                        <MembershipList userListByManager={userListByManager}
                                        _changeSelectedItems={this._changeSelectedItems}/>
                    </div>;
                break;
            case business_operation_action.ADD:
                component =
                    <div className="row">
                        <AddUser userManagerList={userManagerList}
                                 _changeImageUploadStatus={this._changeImageUploadStatus}/>
                    </div>;
                break;
            case business_operation_action.EDIT:
                component =
                    <div className="row">
                        <SendEmail userManagerList={userManagerList} userDetail={userDetail}
                                   _changeImageUploadStatus={this._changeImageUploadStatus}/>
                    </div>;
                break;
            default:
                component = this.oldComponent;
                break;
        }
        this.oldComponent = component;
        return (
            <div>
                <Search />
                <div id="main">
                    <BreadCrumb titles={["任务预警", "流水提取"]}/>
                    <div id="mailbox" style={{top: "35px"}}>
                        <ManagersList userManagerList={userManagerList} _startRefresh={this._startRefresh}
                                      _changeManager={this._changeManager}
                                      _searchManagerByName={this._searchManagerByName}
                                      _getAllManager={this._getAllManager}
                                      _changeSelectedManager={this._changeSelectedManager}
                                      _deleteManager={this._deleteManager}
                                      deleteManagers={this.deletingManager}
                                      userCountOfManager={userCountOfManager}
                        />
                    </div>
                    <div id="content" className="after-mail-box" style={{top: "75px", padding: "15px 18px 0"}}>
                        <Operations title="景鹏" smallTitle="团队" operationStatus={this.operationStatus}
                                    selectedItems={this.selectedItems} _startRefresh={this._startRefresh}
                                    _doAction={this._doAction} addBtnHidden={true} editText="写邮件" deleteText="确认完成"
                                    saveText="发 送" saveIcon="fa-location-arrow" editIcon="fa-envelope-o" deleteIcon="fa-check-square-o" contentTip="完成流水提取任务"/>
                        <div className="row" style={{
                            display: this.optPage == (business_operation_action.LIST || business_operation_action.SEARCH) ? "block" : "none"
                        }}>
                            <FilterPanel conditions={[{key: "用户名", value: "景鹏,郑杰"}, {key: "密码", value: "6656724"}]}
                                         sortColumn="绑卡时间" sortRule="降序" _startRefresh={this._startRefresh}/>
                        </div>
                        {component}
                    </div>
                </div>
                <ConfirmModal id="deleteManagerConfirm" _doAction={this._deleteManager}
                              selectedItems={this.props.selectedItems}/>
            </div>

        )
    }
}

class Search extends Component {
    render() {
        const {type}=this.props;
        return (
            <div className="widget-top-search">
                    <span className="icon"><a href="#" className="close-header-search"><i
                        className="fa fa-times"></i></a></span>
                <form id="top-search">
                    <h2><strong>{"会员搜索"}</strong></h2>

                </form>
            </div>
        )
    }
}

class ManagersList extends Component {
    constructor(props) {
        super(props);
        /*attribute*/
        this.selectedItem = 0;
        /*event*/
        this._changeManager = this._changeManager.bind(this);
        this._searchManagerByName = this._searchManagerByName.bind(this);
    }

    _changeManager(key, id) {
        this.selectedItem = key;
        this.props._changeManager(id);
        this.props._startRefresh();
    }

    _searchManagerByName() {
        var self = this;
        protectInputTooFast(function () {
            self.props._searchManagerByName($("#searchManager").val());
        })
    }

    _getAllManager() {
        this.props._getAllManager($("#searchManager").val());
    }

    render() {
        const {userManagerList, deleteManagers, userCountOfManager}=this.props;
        var self = this;
        return (
            <div id="nav-scroll">
                <div className="mail-list">
                    <header style={{padding: "4px 0"}}>
                        <h2 className="header-text">团队 </h2>
                        <div className="btn-group btn-group-justified opt">
                            <a onClick={this._getAllManager.bind(this)} href="javascript:void(0)"
                               className="btn btn-inverse btn-transparent"><i
                                className="fa fa-plus-square"></i></a>
                            <a href="javascript:void(0)" className="btn btn-inverse btn-transparent " style={{display:"none"}}><i
                                className="fa fa-edit"></i></a>
                            <a href="javascript:void(0)"
                               className="btn btn-inverse btn-transparent active"><i
                                className="fa fa-search"></i></a>
                        </div>
                        <div >
                            <div id="teamSearch" style={{display: "none", marginTop: "5px"}}>
                                <input id="searchManager" onChange={this._searchManagerByName.bind(this)} type="text"
                                       placeholder="请输入团队负责人进行搜索..."
                                       className="form-control"/>
                            </div>
                            <div id="teamEdit"
                                 style={{display: "none", marginTop: "5px", textAlign: "right"}}>
                                <button id="cancel" type="button" className="btn btn-default btn-xs"
                                        style={{marginRight: "2px"}}>取 消
                                </button>
                                <button disabled={deleteManagers.length == 0 ? true : false} data-toggle="modal"
                                        data-target="#deleteManagerConfirm" type="button"
                                        className="btn btn-danger btn-xs"><i
                                    className="fa fa-trash-o"></i> 删除 {deleteManagers.length} 项
                                </button>
                            </div>
                        </div>
                    </header>
                    <ul className="mlist teamResult">
                        {renderList(userManagerList, function (rows) {
                            return rows.map(function (val, key) {
                                return <li key={key}
                                           style={{
                                               backgroundColor: self.selectedItem == key ? "#F1F3F5" : "transparent",
                                               cursor: "pointer"
                                           }}>
                                    <div style={{width: "5%", float: "left"}}>
                                        <input type="checkbox" name="managerCheckbox"
                                               className="form-control teamInput"
                                               style={{marginTop: "-5px", display: "none"}} defaultValue={val.id}
                                               onChange={self.props._changeSelectedManager.bind(self, "managerCheckbox")}/>
                                    </div>
                                    <div onClick={self._changeManager.bind(self, key, val.id)}
                                         style={{width: "85%", paddingLeft: "30px"}}>
                                        <h5><a href="#">{val.name}</a></h5>
                                        <time className="timeago" dateTime={val.register_date}
                                              title={val.register_date}>
                                            {"报单时间 : " + formatDate(val.register_date, "yyyy-mm-dd")}
                                            - {"待提取流水人数 : " + (userCountOfManager.data && userCountOfManager.data[val.id] ? userCountOfManager.data[val.id] : 0)}
                                        </time>
                                        <label data-color="red"
                                               style={{display: userCountOfManager.data && userCountOfManager.data[val.id] && userCountOfManager.data[val.id] != 0 ? "block" : "none"}}></label>
                                    </div>
                                    <div style={{float: "right", marginTop: "-37px"}}></div>
                                </li>
                            })
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

class MembershipList extends Component {
    componentDidMount() {

    }

    render() {
        const {userListByManager, _changeSelectedItems}=this.props;
        var self = this;
        return (
            <section className="panel" style={{marginBottom: "-1px", minHeight: "600px"}}>
                <div className="panel-body" style={{padding: "1px"}}>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>姓名</th>
                            <th>ID</th>
                            <th>用户名</th>
                            <th>邮箱</th>
                            <th>邮箱密码</th>
                            <th>绑卡日期</th>
                        </tr>
                        </thead>
                        <tbody className="text-center">
                        {renderList(userListByManager, function (rows) {
                            return rows.map(function (val, key) {
                                return <tr key={key}>
                                    <td><input type="checkbox" value={val.id} name="member"
                                               onChange={_changeSelectedItems.bind(self, "member")}/></td>
                                    <td>{val.name}</td>
                                    <td>{val.idcard}</td>
                                    <td>{val.account}</td>
                                    <td>{val.email}</td>
                                    <td>{val.email_password}</td>
                                    <td>{formatDate(val.bind_card_date, "yyyy-mm-dd")}</td>

                                </tr>
                            });
                        })}

                        </tbody>
                    </table>
                </div>
            </section>
        )
    }
}

class AddUser extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        var self = this;
        /*jQuery DOM*/
        $("#input-24").fileinput({
            uploadUrl: node_service + '/file/uploading',
            theme: "fa",
            initialPreviewAsData: true,
            language: 'zh',
            showUpload: false,
            showPreview: true,
            enctype: 'multipart/form-data',
            overwriteInitial: false,
            maxFileSize: 100000
        });
        $('#input-24').on('fileuploaded', function (event, data, previewId, index) {
            if (data.response && data.response.result == "SUCCESS") {
                var filePath = data.response.path;
                self.props._changeImageUploadStatus(2, filePath);
            } else {
                self.props._changeImageUploadStatus(3);
            }
        });
        $(".daterange-two").jeDate({
            format: "YYYY-MM-DD hh:mm:ss", //日期格式
            minDate: "1900-01-01 00:00:00", //最小日期
            maxDate: "2099-12-31 23:59:59", //最大日期
            isinitVal: false, //是否初始化时间
            isTime: false, //是否开启时间选择
            isClear: true, //是否显示清空
            festival: false, //是否显示节日
            zIndex: 999,  //弹出层的层级高度
            marks: null, //给日期做标注
        });
        $("#saveForm").validate({
            errorClass: 'validation-error-label',
            successClass: 'validation-valid-label',
            highlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
            },
            unhighlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
            },
            success: function (label) {
                label.addClass("validation-valid-label").text("正确");
            },
            validClass: "validation-valid-label",
            rules: {
                name: {
                    required: true,
                },
                idcard: {
                    required: true,
                },
                account: {
                    required: true,
                },
                password: {
                    required: true,
                },
                email: {
                    required: true,
                    email: true
                },
                email_password: {
                    required: true,
                },
                register_date: {
                    required: true,
                },
            },
            messages: {
                name: {
                    required: "姓名不能为空"
                },
                idcard: {
                    required: "会员ID号不能为空"
                },
                account: {
                    required: "登录账号不能为空"
                },
                password: {
                    required: "登录密码不能为空"
                },
                email: {
                    required: "邮箱不能为空"
                },
                email_password: {
                    required: "邮箱密码不能为空"
                },
                register_date: {
                    required: "请选择报单日期"
                }

            }
        });
        $("#is_manager").on("change", function () {
            $("#manager_id").css({display: $("#is_manager option:selected").val() == 0 ? "block" : "none"});
        });
        $('.selectpicker').selectpicker();

    }

    render() {
        const {userManagerList}=this.props;
        return (
            <section className="panel" style={{minHeight: "600px"}}>
                <div className="panel-body" style={{padding: "1px"}}>
                    <div className="row">
                        <div className="col-md-12" style={{padding: "5px 25px"}}>
                            <br />
                            <h3><strong>基本</strong> 信息</h3>
                            <hr />
                            <form id="saveForm">
                                <div className="form-group row">
                                    <div className="col-md-3">
                                        <label className="control-label">姓名</label>
                                        <input type="text" className="form-control" name="name"
                                               placeholder="报单人员的真实姓名"/>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="control-label">ID</label>
                                        <input type="text" className="form-control" name="idcard"
                                               placeholder="报单人员的ID会员号"/>
                                    </div>
                                    <div className="col-md-3" id="is_manager">
                                        <label className="control-label">职位</label>
                                        <select className="form-control" name="is_manager">
                                            <option value={0}>普通会员</option>
                                            <option value={1}>团队负责人</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3" id="manager_id">
                                        <label className="control-label">所属团队</label>
                                        <select className="selectpicker form-control" name="manager_id" data-size="10"
                                                data-live-search="true">
                                            {renderList(userManagerList, function (rows) {
                                                return rows.map(function (val, key) {
                                                    return <option key={key} value={val.id}>{val.name}</option>
                                                })
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6">
                                        <label className="control-label">账号名称</label>
                                        <input type="text" className="form-control" name="account"
                                               placeholder="后台登录账号"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="control-label">账号密码</label>
                                        <input type="text" className="form-control" placeholder="后台登录密码"
                                               name="password"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6">
                                        <label className="control-label">账号当前状态</label>
                                        <select className="form-control" name="task_status">
                                            <option value={0}>后台选码完毕，等待下轮流水提取</option>
                                            <option value={1}>流水提取完毕，等待后续后台选码</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="control-label">报单日期</label>
                                        <input id="bindCard" type="text"
                                               className="form-control daterange-two" name="register_date"
                                               placeholder="会员报单的日期"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6">
                                        <label className="control-label">绑卡日期</label>
                                        <input id="renewFee" type="text"
                                               className="form-control daterange-two" name="bind_card_date"
                                               placeholder="会员绑卡的日期"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="control-label">虚拟卡</label>
                                        <select className="form-control" name="virtual_card">
                                            <option value={0}>未绑定</option>
                                            <option value={1}>已绑定</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6">
                                        <label className="control-label">邮箱</label>
                                        <input type="text" className="form-control" name="email"
                                               placeholder="个人提交的私人邮箱"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="control-label">邮箱密码</label>
                                        <input type="text" className="form-control" placeholder="邮箱密码"
                                               name="email_password"/>
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <label className="control-label">银行卡图片</label>
                                    <input id="input-24" name="inputFile" type="file" className="file-loading"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

class SendEmail extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        var self = this;
        /*jQuery DOM*/
        var timer = setInterval(function () {
            if (self.props.userDetail.data) {
                $("#saveForm").validate({
                    errorClass: 'validation-error-label',
                    successClass: 'validation-valid-label',
                    highlight: function (element, errorClass) {
                        $(element).removeClass(errorClass);
                    },
                    unhighlight: function (element, errorClass) {
                        $(element).removeClass(errorClass);
                    },
                    success: function (label) {
                        label.addClass("validation-valid-label").text("正确");
                    },
                    validClass: "validation-valid-label",
                    rules: {
                        name: {
                            required: true,
                        },
                        idcard: {
                            required: true,
                        },
                        account: {
                            required: true,
                        },
                        password: {
                            required: true,
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        email_password: {
                            required: true,
                        },
                        register_date: {
                            required: true,
                        },
                    },
                    messages: {
                        name: {
                            required: "姓名不能为空"
                        },
                        idcard: {
                            required: "会员ID号不能为空"
                        },
                        account: {
                            required: "登录账号不能为空"
                        },
                        password: {
                            required: "登录密码不能为空"
                        },
                        email: {
                            required: "邮箱不能为空"
                        },
                        email_password: {
                            required: "邮箱密码不能为空"
                        },
                        register_date: {
                            required: "请选择报单日期"
                        }

                    }
                });
                $("#manager_id").css({display: $("#is_manager option:selected").val() == 0 ? "block" : "none"});
                $("#is_manager").on("change", function () {
                    $("#manager_id").css({display: $("#is_manager option:selected").val() == 0 ? "block" : "none"});
                });

                clearInterval(timer);
            }
        }, 100);

    }

    render() {
        const {userManagerList, userDetail}=this.props;
        return (
            <section className="panel" style={{minHeight: "600px"}}>
                <div className="panel-body" style={{padding: "1px"}}>
                    <div className="row">
                        <div className="col-md-12" style={{padding: "5px 25px"}}>
                            <br />
                            <h3><strong>发件人</strong> 信息</h3>
                            <hr />
                            {renderList(userDetail, function (rows) {
                                return <form id="saveForm">
                                    <div className="form-group row">
                                        <div className="col-md-3">
                                            <label className="control-label">姓名</label>
                                            <input type="text" className="form-control" name="name"
                                                   defaultValue={rows[0].name}
                                                   placeholder="报单人员的真实姓名" disabled={true}/>
                                        </div>
                                        <div className="col-md-3">
                                            <label className="control-label">ID</label>
                                            <input type="text" className="form-control" name="idcard"
                                                   defaultValue={rows[0].idcard}
                                                   placeholder="报单人员的ID会员号" disabled={true}/>
                                        </div>
                                        <div className="col-md-3" id="is_manager">
                                            <label className="control-label">职位</label>
                                            <select className="form-control" name="is_manager" disabled={true}
                                                    defaultValue={rows[0].is_manager}>
                                                <option value={0}>普通会员</option>
                                                <option value={1}>团队负责人</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3" id="manager_id">
                                            <label className="control-label">所属团队</label>
                                            <select className="selectpicker form-control" name="manager_id" disabled={true}
                                                    defaultValue={rows[0].manager_id}
                                                    data-size="10"
                                                    data-live-search="true">
                                                {renderList(userManagerList, function (rows) {
                                                    return rows.map(function (val, key) {
                                                        return <option key={key} value={val.id}>{val.name}</option>
                                                    })
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-4">
                                            <label className="control-label">账号名称</label>
                                            <input type="text" className="form-control" name="account" disabled={true}
                                                   defaultValue={rows[0].account}
                                                   placeholder="后台登录账号"/>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="control-label">绑卡日期</label>
                                            <input id="renewFee" type="text"
                                                   className="form-control daterange-two" name="bind_card_date"
                                                   defaultValue={formatDate(rows[0].bind_card_date, "yyyy-mm-dd")} disabled={true}
                                                   placeholder="会员绑卡的日期"/>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="control-label">邮箱</label>
                                            <input type="text" className="form-control" placeholder="邮箱" disabled={true}
                                                   defaultValue={rows[0].email}
                                                   name="email_password"/>
                                        </div>
                                    </div>
                                </form>
                            })}
                            <br />
                            <h3><strong>新邮件</strong> 内容</h3>
                            <hr />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    const {commonReducer, userManagerListReducer, userListByManagerReducer, userDetailReducer, userCountOfManagerReducer}=state
    return {
        refresh: commonReducer.refresh,
        userManagerList: userManagerListReducer,
        userListByManager: userListByManagerReducer,
        userDetail: userDetailReducer,
        userCountOfManager: userCountOfManagerReducer
    }
}

export default connect(mapStateToProps)(NeedDownloadFlowContainer)