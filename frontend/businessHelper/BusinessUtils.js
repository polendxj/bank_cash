/**
 * Created by Administrator on 2017/5/9.
 */
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

export class ConfirmModal extends Component {
    constructor(props) {
        super(props);
        this._doAction = this._doAction.bind(this);
    }

    _doAction() {
        this.props._doAction();
        $("#confirm_modal").modal("hide");
    }

    render() {
        const {selectedItems}=this.props;
        var text = [];
        if (selectedItems) {
            if (selectedItems.length > 6) {
                text = "所选择的 " + selectedItems.length + " 项条目吗？";
            } else {
                selectedItems.forEach(function (val, key) {
                    text.push(<span key={key} className="label label-info" style={{marginRight:"5px",position:"relative",top:"-2px"}}>{val.value}</span>);
                });
            }
        }

        return (
            <div id="confirm_modal" className="modal fade" tabIndex="-1" data-width="600">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true"><i
                        className="fa fa-times"></i></button>
                    <h3>系统提示</h3>
                </div>
                <div className="modal-body">
                    <p>确认删除 {text} 吗？</p>
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