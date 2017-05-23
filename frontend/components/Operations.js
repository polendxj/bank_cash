/**
 * Created by Administrator on 2017/5/13.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {ConfirmModal,ListModal} from '../businessHelper/BusinessUtils';
import classnames from "classnames"

export default class Operations extends Component {
    constructor(props) {
        super(props);
        /*attribute*/
        this.backBtn = false;
        this.addBtn = this.props.addBtnHidden ? false : true;
        this.editBtn = this.props.editBtnHidden ? false : true;
        this.deleteBtn = this.props.deleteBtnHidden ? false : true;
        this.saveBtn = false;
        this.searchBtn = this.props.searchBtnHidden ? false : true;
        this.doing = false;
        //special btn define


        /*event*/
        this._add = this._add.bind(this);
        this._delete = this._delete.bind(this);
        this._edit = this._edit.bind(this);
        this._save = this._save.bind(this);
        this._search = this._search.bind(this);
        this._back = this._back.bind(this);
        this._startRefresh = this._startRefresh.bind(this);
    }

    _add() {
        this.backBtn = true;
        this.addBtn = false;
        this.editBtn = false;
        this.deleteBtn = false;
        this.saveBtn = true;
        this.searchBtn = false;
        this.props._doAction(business_operation_action.ADD);
    }

    _delete() {
        this.props._doAction(business_operation_action.DELETE);
    }

    _edit() {
        this.backBtn = true;
        this.addBtn = false;
        this.editBtn = false;
        this.deleteBtn = false;
        this.saveBtn = true;
        this.searchBtn = false;
        this.props._doAction(business_operation_action.EDIT);
    }

    _save() {
        this.props._doAction(business_operation_action.SAVE);

    }

    _search() {
        this.props._doAction(business_operation_action.SEARCH);
    }

    _back() {
        this.backBtn = false;
        this.addBtn = this.props.addBtnHidden ? false : true;
        this.editBtn = true;
        this.deleteBtn = true;
        this.saveBtn = false;
        this.searchBtn = true;
        this.props._doAction(business_operation_action.LIST);
    }

    _startRefresh() {
        this.props._startRefresh();
    }

    componentDidMount() {
        $(".btn-header-search , .close-header-search").on('click', function () {
            var navSearch = $(".widget-top-search");
            navSearch.toggleClass("nav-top-search");
            if ($(this).hasClass("close-header-search")) {
                $.clearOverlay();
                return true;
            }
            navSearch.find("input").focus();
            $.overlay(0.4);
        });
    }

    render() {
        const {selectedItems}=this.props;
        var content = "";
        if (this.props.operationStatus == business_operation_status.INIT) {
            content =
                <div className="btn-group  pull-right ">
                    <button onClick={this._back} type="button" className="btn btn-default btn-sm"
                            style={{marginRight: "5px", display: this.backBtn ? "inline-block" : "none"}}><i
                        className="fa fa-reply"></i> 返 回
                    </button>
                    <button onClick={this._save} type="button" className="btn btn-success btn-sm"
                            style={{marginRight: "5px", display: this.saveBtn ? "inline-block" : "none"}}>
                        <i className={"fa " + (this.props.saveIcon ? this.props.saveIcon : "fa-save")}></i> {this.props.saveText ? this.props.saveText : "保 存"}

                    </button>
                    <button onClick={this._add} type="button" className="btn btn-primary btn-sm"
                            style={{marginRight: "5px", display: this.addBtn ? "inline-block" : "none"}}><i
                        className="fa fa-plus-square"></i> 新 增
                    </button>
                    <button onClick={this._edit} type="button"
                            className="btn btn-theme-inverse  btn-sm"
                            style={{marginRight: "5px", display: this.editBtn ? "inline-block" : "none"}}
                            disabled={selectedItems.length != 1 ? true : false}
                    >
                        <i className={"fa " + (this.props.editIcon ? this.props.editIcon : "fa-edit")}></i> {this.props.editText ? this.props.editText : "编 辑"}
                    </button>
                    <button onClick={this._startRefresh} type="button" className="btn btn-danger btn-sm"
                            style={{marginRight: "5px", display: this.deleteBtn ? "inline-block" : "none"}}
                            data-toggle="modal" data-target="#confirm_modal"
                            disabled={selectedItems.length == 0 ? true : false}
                    >
                        <i className={"fa " + (this.props.deleteIcon ? this.props.deleteIcon : "fa-trash-o")}></i> {this.props.deleteText ? this.props.deleteText : "删 除"}
                    </button>
                    <button id="searchBtn" onClick={this._search} type="button"
                            className="btn btn-sm btn-header-search" style={{
                        backgroundColor: "#F6F6F6",
                        borderColor: "#DDDDDD",
                        color: "gray",
                        display: this.searchBtn ? "inline-block" : "none"
                    }}>
                        <i className="fa fa-search"></i>
                    </button>

                </div>;
        } else if (this.props.operationStatus == business_operation_status.DOING) {
            content =
                <div className="btn-group  pull-right ">
                    <button onClick={this._back} type="button" className="btn btn-default btn-sm"
                            style={{marginRight: "5px", display: "none"}}><i
                        className="fa fa-reply"></i> 返 回
                    </button>
                    <button onClick={this._save} type="button" className="btn btn-success btn-sm"
                            style={{marginRight: "5px", display: "none"}}>
                        <i className={"fa " + (this.props.saveIcon ? this.props.saveIcon : "fa-save")}></i> {this.props.saveText ? this.props.saveText : "保 存"}

                    </button>
                    <button onClick={this._add} type="button" className="btn btn-primary btn-sm"
                            style={{marginRight: "5px", display: "none"}}><i
                        className="fa fa-plus-square"></i> 新 增
                    </button>
                    <button onClick={this._edit} type="button"
                            className="btn btn-theme-inverse  btn-sm"
                            style={{marginRight: "5px", display: "none"}}>
                        <i className={"fa " + (this.props.editIcon ? this.props.editIcon : "fa-edit")}></i> {this.props.editText ? this.props.editText : "编 辑"}
                    </button>
                    <button onClick={this._startRefresh} type="button" className="btn btn-danger btn-sm"
                            style={{marginRight: "5px", display: "none"}} data-toggle="modal"
                            data-target="#confirm_modal">
                        <i className={"fa " + (this.props.deleteIcon ? this.props.deleteIcon : "fa-trash-o")}></i> {this.props.deleteText ? this.props.deleteText : "删 除"}
                    </button>
                    <button id="searchBtn" onClick={this._search} type="button"
                            className="btn btn-sm btn-header-search" style={{
                        backgroundColor: "#F6F6F6",
                        borderColor: "#DDDDDD",
                        color: "gray",
                        display: "none"
                    }}>
                        <i className="fa fa-search"></i>
                    </button>
                    <button type="button" className="btn btn-warning btn-sm" style={{color: "black"}}
                            disabled="disabled">
                        <i className="fa fa-spinner fa-spin"></i> 操作处理中，请稍后...
                    </button>
                </div>;
        } else if (this.props.operationStatus == business_operation_status.SUCCESS) {
            this.backBtn = false;
            this.addBtn = this.props.addBtnHidden ? false : true;;
            this.editBtn = this.props.editBtnHidden ? false : true;
            this.deleteBtn = this.props.deleteBtnHidden ? false : true;
            this.saveBtn = false;
            this.searchBtn = this.props.searchBtnHidden ? false : true;
            content =
                <div className="btn-group  pull-right ">
                    <button onClick={this._back} type="button" className="btn btn-default btn-sm"
                            style={{marginRight: "5px", display: this.backBtn ? "inline-block" : "none"}}><i
                        className="fa fa-reply"></i> 返 回
                    </button>
                    <button onClick={this._save} type="button" className="btn btn-success btn-sm"
                            style={{marginRight: "5px", display: this.saveBtn ? "inline-block" : "none"}}>
                        <i className={"fa " + (this.props.saveIcon ? this.props.saveIcon : "fa-save")}></i> {this.props.saveText ? this.props.saveText : "保 存"}

                    </button>
                    <button onClick={this._add} type="button" className="btn btn-primary btn-sm"
                            style={{marginRight: "5px", display: this.addBtn ? "inline-block" : "none"}}><i
                        className="fa fa-plus-square"></i> 新 增
                    </button>
                    <button onClick={this._edit} type="button"
                            className="btn btn-theme-inverse  btn-sm"
                            style={{marginRight: "5px", display: this.editBtn ? "inline-block" : "none"}}
                            disabled={selectedItems.length != 1 ? true : false}
                    >
                        <i className={"fa " + (this.props.editIcon ? this.props.editIcon : "fa-edit")}></i> {this.props.editText ? this.props.editText : "编 辑"}
                    </button>
                    <button onClick={this._startRefresh} type="button" className="btn btn-danger btn-sm"
                            style={{marginRight: "5px", display: this.deleteBtn ? "inline-block" : "none"}}
                            data-toggle="modal" data-target="#confirm_modal"
                            disabled={selectedItems.length == 0 ? true : false}
                    >
                        <i className={"fa " + (this.props.deleteIcon ? this.props.deleteIcon : "fa-trash-o")}></i> {this.props.deleteText ? this.props.deleteText : "删 除"}
                    </button>
                    <button id="searchBtn" onClick={this._search} type="button"
                            className="btn btn-sm btn-header-search" style={{
                        backgroundColor: "#F6F6F6",
                        borderColor: "#DDDDDD",
                        color: "gray",
                        display: this.searchBtn ? "inline-block" : "none"
                    }}>
                        <i className="fa fa-search"></i>
                    </button>

                </div>;
        } else if (this.props.operationStatus == business_operation_status.ERROR) {
            content =
                <div className="btn-group  pull-right ">
                    <button onClick={this._back} type="button" className="btn btn-default btn-sm"
                            style={{marginRight: "5px", display: this.backBtn ? "inline-block" : "none"}}><i
                        className="fa fa-reply"></i> 返 回
                    </button>
                    <button onClick={this._save} type="button" className="btn btn-success btn-sm"
                            style={{marginRight: "5px", display: this.saveBtn ? "inline-block" : "none"}}>
                        <i className={"fa " + (this.props.saveIcon ? this.props.saveIcon : "fa-save")}></i> {this.props.saveText ? this.props.saveText : "保 存"}

                    </button>
                    <button onClick={this._add} type="button" className="btn btn-primary btn-sm"
                            style={{marginRight: "5px", display: this.addBtn ? "inline-block" : "none"}}><i
                        className="fa fa-plus-square"></i> 新 增
                    </button>
                    <button onClick={this._edit} type="button"
                            className="btn btn-theme-inverse  btn-sm"
                            style={{marginRight: "5px", display: this.editBtn ? "inline-block" : "none"}}
                            disabled={selectedItems.length != 1 ? true : false}
                    >
                        <i className={"fa " + (this.props.editIcon ? this.props.editIcon : "fa-edit")}></i> {this.props.editText ? this.props.editText : "编 辑"}
                    </button>
                    <button onClick={this._startRefresh} type="button" className="btn btn-danger btn-sm"
                            style={{marginRight: "5px", display: this.deleteBtn ? "inline-block" : "none"}}
                            data-toggle="modal" data-target="#confirm_modal"
                            disabled={selectedItems.length == 0 ? true : false}
                    >
                        <i className={"fa " + (this.props.deleteIcon ? this.props.deleteIcon : "fa-trash-o")}></i> {this.props.deleteText ? this.props.deleteText : "删 除"}
                    </button>
                    <button id="searchBtn" onClick={this._search} type="button"
                            className="btn btn-sm btn-header-search" style={{
                        backgroundColor: "#F6F6F6",
                        borderColor: "#DDDDDD",
                        color: "gray",
                        display: this.searchBtn ? "inline-block" : "none"
                    }}>
                        <i className="fa fa-search"></i>
                    </button>

                </div>;
        }
        console.log(this.props.modalType);
        var modal = this.props.modalType=="ListModal"?<ListModal  content={this.props.content} _doAction={this._delete} tip={this.props.tip}/>:<ConfirmModal _doAction={this._delete} selectedItems={this.props.selectedItems} contentTip={this.props.contentTip}/>
        return (
            <div className="row">
                <div>
                    <div className="mail-tools clearfix" style={{marginBottom: "2px"}}>
                        {content}
                        <h4 className="hidden-xs pull-left">{this.props.title}
                            <small>{this.props.smallTitle}</small>
                        </h4>

                    </div>
                </div>
                {modal}
            </div>
        )
    }
}