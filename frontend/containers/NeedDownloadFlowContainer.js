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
import {operation_notification, ConfirmModal, renderList, formatDate,ListModal} from '../businessHelper/BusinessUtils'
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
    USER_COUNT_OF_MANAGER_START, USER_COUNT_OF_MANAGER_END,
    SEND_EMAIL_START,SEND_EMAIL_END,
    DOWNLOAD_FLOW_START,DOWNLOAD_FLOW_END,
    TASK_USER_START,TASK_USER_END
} from '../constants/index'
import RichText from "./RichText"


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
        this.selectedManagerName = "";
        this.deletingManager = [];
        this.files = [];
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
        this.getFilePaths = this.getFilePaths.bind(this);
    }

    componentDidMount() {
        var self = this;
        $(".daterange-two").jeDate({
            format: "YYYY-MM-DD hh:mm:ss", //日期格式
            minDate: "1900-01-01 00:00:00", //最小日期
            maxDate: "2099-12-31 23:59:59", //最大日期
            isinitVal: false, //是否初始化时间
            isTime: false, //是否开启时间选择
            isClear: true, //是否显示清空
            festival: false, //是否显示节日
            zIndex: 9999,  //弹出层的层级高度
            marks: null, //给日期做标注
        });
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
            "is_manager": 1,
            "taskType": "flow_record_status"
        }, USER_MANAGER_LIST_START, USER_MANAGER_LIST_END, user_list, function (json) {
            if (json.count > 0) {
                self.selectedManagerName = json.rows[0].name;
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
                if ($("#sendEmailForm").validate().form()) {
                    this.operationStatus = business_operation_status.DOING;
                    var params = array2Json($("#sendEmailForm").serializeArray());
                    params.id = self.props.userDetail.data.rows[0].id;
                    params.plan_deal_date = self.props.userDetail.data.rows[0].plan_flow_record_date;
                    params.from_email = self.props.userDetail.data.rows[0].email;
                    params.email_password = self.props.userDetail.data.rows[0].email_password;
                    params.content = UE.getEditor("richTextContent").getContent();
                    params.files = this.files;
                    this.props.dispatch(saveObject(params, SEND_EMAIL_START, SEND_EMAIL_END, send_email, function (json) {
                        if (json.result == 'SUCCESS') {
                            self.operationStatus = business_operation_status.SUCCESS;
                            self.optPage = business_operation_action.LIST;
                            self.selectedItems.splice(0);
                            self._changeManager(params.manager_id,params.name);
                            self._getAllManager();
                            self.props.dispatch(getListByMutilpCondition({}, TASK_USER_START, TASK_USER_END, task_user));
                        } else {
                            self.operationStatus = business_operation_status.ERROR;
                            self._startRefresh();
                        }
                    }));
                }else{
                    var recipient = $("#recipient").val();
                    console.log("recipient",recipient);
                    var subject = $("#subject").val();
                    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    var text = "";
                    if(!recipient){
                        operation_notification(0, "请填写收件人后再发送");
                    }else if(!myreg.test(recipient)){
                        operation_notification(0, "请填写正确的收件人邮箱");
                    }else if(!subject){
                        operation_notification(0, "请输入标题");
                    }
                }
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
                if($("#flowRecordDate").val()){
                    this.operationStatus = business_operation_status.DOING;
                    self.props.dispatch(deleteObject({
                        "ids": self.selectedItems,
                        "admin_id":1,
                        flow_record_date:$("#flowRecordDate").val()
                    }, DOWNLOAD_FLOW_START, DOWNLOAD_FLOW_END, download_flow, function (json) {
                        self.selectedItems.splice(0);
                        self.operationStatus = business_operation_status.SUCCESS;
                        var id = self.selectedManager ? self.selectedManager : self.props.userManagerList.data.rows[0].id;
                        var name = self.selectedManagerName ? self.selectedManagerName : self.props.userManagerList.data.rows[0].name;
                        self._changeManager(id,name);
                        self.props.dispatch(getListByMutilpCondition({}, TASK_USER_START, TASK_USER_END, task_user));
                    }));
                    this.props.dispatch(getListByMutilpCondition({"flow_record_status": 1}, USER_COUNT_OF_MANAGER_START, USER_COUNT_OF_MANAGER_END, user_count_of_manager));
                }else{
                    operation_notification(0, "请输入流水提取完成时间");
                }
                break;
            case business_operation_action.LIST:
                this.selectedItems.splice(0);
                break;
        }
        this._startRefresh();
    }
    getFilePaths(files){
        this.files = this.files.concat(files);
        console.log("paths",this.files);
    }
    _changeManager(id,name) {
        this.selectedManager = id;
        this.selectedManagerName = name;
        this.props.dispatch(getListByMutilpCondition({
            "page": 0,
            "pageSize": page_size,
            "manager_id": id,
            "flow_record_status": 1
        }, USER_LIST_START, USER_LIST_END, user_list));
    }

    _searchManagerByName(name) {
        var self = this;
        this.props.dispatch(getListByMutilpCondition({
            "page": 0,
            "pageSize": page_size,
            "is_manager": 1,
            "name": name
        }, USER_MANAGER_LIST_START, USER_MANAGER_LIST_END, user_list,function (json) {
            if (json.count > 0) {
                self.selectedManagerName = json.rows[0].name;
                self.props.dispatch(getListByMutilpCondition({
                    "page": 0,
                    "pageSize": page_size,
                    "manager_id": json.rows[0].id,
                    "flow_record_status": 1
                }, USER_LIST_START, USER_LIST_END, user_list));
            }
        }));
    }

    _getAllManager() {
        var self = this;
        this.props.dispatch(getListByMutilpCondition({
            "page": 0,
            "pageSize": page_size,
            "is_manager": 1,
            "taskType": "flow_record_status"
        }, USER_MANAGER_LIST_START, USER_MANAGER_LIST_END, user_list,function (json) {
            if (json.count > 0) {
                self.selectedManagerName = json.rows[0].name;
                self.props.dispatch(getListByMutilpCondition({
                    "page": 0,
                    "pageSize": page_size,
                    "manager_id": json.rows[0].id,
                    "flow_record_status": 1
                }, USER_LIST_START, USER_LIST_END, user_list));
            }
        }));
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

    _showEmailModal(id){
        this.props.dispatch(getListByMutilpCondition({
            "page": 0,
            "pageSize": page_size,
            "id": id
        }, USER_DETAIL_START, USER_DETAIL_END, user_list));
    }

    render() {
        const {userManagerList, userListByManager, userDetail, userCountOfManager}=this.props;
        console.log("userDetail",userDetail);
        var component = "";
        switch (this.optPage) {
            case business_operation_action.DELETE:
            case business_operation_action.LIST:
                component =
                    <div className="row">
                        <Pagenation counts={userListByManager.data ? userListByManager.data.count : 0}
                                    page={this.page}
                                    _changePage={this._changePage} _prePage={this._prePage}
                                    _nextPage={this._nextPage}/>
                        <MembershipList userListByManager={userListByManager} userManagerList={userManagerList} _doAction={this._doAction}
                                        _changeSelectedItems={this._changeSelectedItems} _startRefresh={this._startRefresh}
                                        _changeImageUploadStatus={this._changeImageUploadStatus} getFilePaths={this.getFilePaths}
                                        _showEmailModal={this._showEmailModal.bind(this)}/>
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
                                   _changeImageUploadStatus={this._changeImageUploadStatus} getFilePaths={this.getFilePaths}/>
                    </div>;
                break;
            default:
                component = this.oldComponent;
                break;
        }
        this.oldComponent = component;
        var flowRecordDate =  <form>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label className="control-label">流水提取完成时间</label>
                        <input id="flowRecordDate" type="text"
                               className="form-control daterange-two" name="flow_record_date"
                               placeholder="流水提取完成的时间"/>
                    </div>
                </div>
            </form>;
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
                        <Operations title={this.selectedManagerName} smallTitle="团队" operationStatus={this.operationStatus}
                                    selectedItems={this.selectedItems} _startRefresh={this._startRefresh}
                                    _doAction={this._doAction} addBtnHidden={true} editText="写邮件" deleteText="确认完成"
                                    saveText="发 送" saveIcon="fa-location-arrow" editIcon="fa-envelope-o" deleteIcon="fa-check-square-o"
                                    modalType="ListModal" content={flowRecordDate} tip="发送邮件时间"/>
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

    _changeManager(key, id,name) {
        this.selectedItem = key;
        this.props._changeManager(id,name);
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
                                    <div onClick={self._changeManager.bind(self, key, val.id,val.name)}
                                         style={{width: "85%", paddingLeft: "30px"}}>
                                        <h5><a href="#">{val.name}</a></h5>
                                        <time className="timeago" dateTime={formatDate(val.register_date, "yyyy-mm-dd")}
                                              title={formatDate(val.register_date, "yyyy-mm-dd")}>
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
    constructor(props) {
        super(props);
        this.detailData = [];
        this._showEmailModal = this._showEmailModal.bind(this);
    }
    componentDidMount() {
        // $('#email_modal').on('shown', function () {
        //     $('#email_modal').find(".modal-body").css({overflow:"hidden"})
        // })
        // $("#demo01").animatedModal();
    }
    _showEmailModal(val){
        this.detailData[0] = val;
        this.props._showEmailModal(val.id);
        $("#email_modal").parent(".modal-scrollable").css({overflow:"hidden"});
    }
    render() {
        const {userListByManager,userManagerList, _changeSelectedItems}=this.props;
        var self = this;
        var width = window.screen.width;
        var height = window.screen.height-57-74-110;
        var style = {top:0,marginTop:0};
        var bodyStyle = {overflow:"hidden"};
        var content = <SendEmail userManagerList={userManagerList} userDetail={this.detailData}
                                 _changeImageUploadStatus={this.props._changeImageUploadStatus} getFilePaths={this.props.getFilePaths}/>;
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
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody className="text-center">
                        {renderList(userListByManager, function (rows) {
                            return rows.map(function (val, key) {
                                return <tr key={key}>
                                    <td><input type="checkbox" value={val.id+"_"+formatDate(val.plan_flow_record_date, "yyyy-mm-dd")} name="member"
                                               onChange={_changeSelectedItems.bind(self, "member")}/></td>
                                    <td>{val.name}</td>
                                    <td>{val.idcard}</td>
                                    <td>{val.account}</td>
                                    <td>{val.email}</td>
                                    <td>{val.email_password}</td>
                                    <td>{formatDate(val.bind_card_date, "yyyy-mm-dd")}</td>
                                    <td>
                                        <li id="sendEmail" href="#animatedModal" onClick={self._showEmailModal.bind(self,val)} className="btn btn-theme-inverse btn-sm"
                                                style={{marginRight: "5px"}} data-toggle="modal" data-target="#email_modal"
                                        >
                                            <i className={"fa fa-envelope-o"}/> {"写邮件"}
                                        </li>
                                    </td>
                                </tr>
                            });
                        })}
                        </tbody>
                    </table>
                </div>
                <ListModal id="email_modal" content={content} tip="新邮件" _doAction={this.props._doAction} sendEmail={true} width={width} height={height} style={style} bodyStyle={bodyStyle}/>
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
                $("#sendEmailForm").validate({
                    rules: {
                        subject: {
                            required: true,
                        },
                        recipient: {
                            required: true,
                            email: true
                        }
                    },
                    errorPlacement: function(error, element) {},
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
        const imgPath = "http://localhost:80/img/ueditor/866647032289431552.JPG";
        var img = "";
        if(imgPath){
            img = "<img src="+imgPath+" />"
        }
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
                                                   value={rows[0].name}
                                                   placeholder="报单人员的真实姓名" disabled={true}/>
                                        </div>
                                        <div className="col-md-3">
                                            <label className="control-label">ID</label>
                                            <input type="text" className="form-control" name="idcard"
                                                   value={rows[0].idcard}
                                                   placeholder="报单人员的ID会员号" disabled={true}/>
                                        </div>
                                        <div className="col-md-3" id="is_manager">
                                            <label className="control-label">职位</label>
                                            <select className="form-control" name="is_manager" disabled={true}
                                                    value={rows[0].is_manager}>
                                                <option value={0}>普通会员</option>
                                                <option value={1}>团队负责人</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3" id="manager_id">
                                            <label className="control-label">所属团队</label>
                                            <select className="selectpicker form-control" name="manager_id" disabled={true}
                                                    value={rows[0].manager_id}
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
                            <form id="sendEmailForm" className="form-horizontal">
                                <div className="form-group row">
                                    <label className="col-lg-1 control-label" style={{minWidth:"68px",textAlign: 'right'}}>收件人</label>
                                    <div className="col-lg-11">
                                        <input id="recipient" type="text" className="form-control" name="recipient"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-1 control-label" style={{minWidth:"68px",textAlign: 'right'}}>主题</label>
                                    <div className="col-lg-11">
                                        <input id="subject" type="text" className="form-control" name="subject"/>
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="col-lg-1 control-label"
                                           style={{minWidth:"68px",textAlign: 'right'}}>{"内容"}</label>
                                    <div className="col-lg-11">
                                        <ul id="upload_file_wrap"></ul>
                                        <RichText id="richTextContent" height="500" value={img} disabled={false} getFilePaths={this.props.getFilePaths}/>
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