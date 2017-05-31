/**
 * Created by Administrator on 2017/5/9.
 */
import Loading from '../components/Loading'
import NoData from '../components/NoData'

import React, {Component, PropTypes} from 'react'
/*
 * @author    Jabriel
 * @see       在右上角弹出通知栏
 * @param     result
 *            操作成功还是失败，0-失败,1-成功
 *            message
 *            如果失败，则显示具体的失败原因
 * @return
 * @exception
 * */
export function operation_notification(result, message) {
    if (result == 1) {
        $.notific8("操作成功", {
            verticalEdge: 'right',
            horizontalEdge: 'top',
            life: 2000,
            theme: 'success'
        });
    } else {
        $.notific8(message, {
            verticalEdge: 'right',
            horizontalEdge: 'top',
            heading: "操作失败",
            life: 4000,
            theme: 'danger'
        });
    }
}
/*
 * @author    Zaki
 * @see       在屏幕中央弹出对话框
 * @param     doAction
 *            点击确认后需要执行的操作
 * @return
 * @exception
 * */
export class ListModal extends Component {
    constructor(props) {
        super(props);
        this._doAction = this._doAction.bind(this);
    }

    _doAction() {
        this.props._doAction();
        $("#" + (this.props.id ? this.props.id : "confirm_modal")).modal("hide");
    }

    render() {
        const {tip,content,width,height,style,bodyStyle}=this.props;
        return (
            <div id={this.props.id ? this.props.id : "confirm_modal"} className="modal fade" tabIndex="-1" style={style}
                 data-width={width?width:"600"} data-height={height}>
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true"><i
                        className="fa fa-times"></i></button>
                    <h3>{tip}</h3>
                </div>
                <div className="modal-body" style={bodyStyle}>
                    {content}
                </div>
                <div className="modal-footer">
                    <button type="button" data-dismiss="modal" className="btn btn-inverse">取 消</button>

                    <button className="btn btn-theme" data-toggle="modal" data-target="#md-stack2"
                            onClick={this._doAction.bind(this)}>确 认
                    </button>
                </div>
            </div>
        )
    }
}
/*
 * @author    Jabriel
 * @see       在屏幕中央弹出确认对话框
 * @param     _doAction
 *            点击确认后需要执行的操作
 *            selectedItems
 *            显示在框中的文本，数组类型，支持多个，显示形式以逗号分隔
 * @return
 * @exception
 * */
export class ConfirmModal extends Component {
    constructor(props) {
        super(props);
        this._doAction = this._doAction.bind(this);
    }

    _doAction() {
        this.props._doAction();
        $("#" + (this.props.id ? this.props.id : "confirm_modal")).modal("hide");
    }

    render() {
        const {selectedItems}=this.props;
        var text = [];
        if (selectedItems) {
            if (selectedItems.length > 6) {
                text = "所选择的 " + selectedItems.length + " 项条目吗？";
            } else {
                selectedItems.forEach(function (val, key) {
                    text.push(<span key={key} className="label label-info"
                                    style={{marginRight: "5px", position: "relative", top: "-2px"}}>{val.value}</span>);
                });
            }
        }

        return (
            <div id={this.props.id ? this.props.id : "confirm_modal"} className="modal fade" tabIndex="-1"
                 data-width="600">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true"><i
                        className="fa fa-times"></i></button>
                    <h3>系统提示</h3>
                </div>
                <div className="modal-body">
                    <p>确认{this.props.contentTip ? this.props.contentTip : "删除"} {text} 吗？</p>
                </div>
                <div className="modal-footer">
                    <button type="button" data-dismiss="modal" className="btn btn-inverse">取 消</button>

                    <button className="btn btn-theme" data-toggle="modal" data-target="#md-stack2"
                            onClick={this._doAction.bind(this)}>确 认
                    </button>
                </div>
            </div>
        )
    }
}
/*
 * @author    Jabriel
 * @see       对多行数据进行统一渲染，带有loading，nodata的效果，依赖组件Loading，NoData
 * @param     reducer
 *            从reducer获取来的数据
 *            callback
 *            渲染DOM的模板函数
 * @return
 * @exception
 * */
export function renderList(reducer, callback) {
    if(reducer){
        if(reducer.length){
            if(reducer.length>0){
                return callback(reducer);
            }else{
                return <NoData />;
            }
        }else{
            if (reducer.fetching) {
                return <Loading />;
            } else {
                if (reducer.data && reducer.data.count > 0) {
                    return callback(reducer.data.rows);
                } else {
                    return <NoData />;
                }
            }
        }
    }else {
        return <NoData />;
    }
}

/*
 * @author    Jabriel
 * @see       对多行数据进行统一渲染，带有loading，nodata的效果，依赖组件Loading，NoData
 * @param     reducer
 *            从reducer获取来的数据
 *            callback
 *            渲染DOM的模板函数
 * @return
 * @exception
 * */
export function formatDate(time, type) {
    var result = "";
    var t = new Date(time);
    switch (type) {
        case "yyyy-mm-dd":
            result = t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
            break;
        case "yyyy-mm-dd hh:MM:ss":
            result = t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds();
            break;
        default:
            result = type;
            break;
    }
    return result;
}

export function historyStatus(type) {
    var result = "";
    switch (type) {
        case 1:
            result = "流水提取";
            break;
        case 2:
            result = "后台选码";
            break;
        case 3:
            result = "续费";
            break;
        default:
            result = "未知";
            break;
    }
    return result;
}