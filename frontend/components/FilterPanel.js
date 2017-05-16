/**
 * Created by Administrator on 2017/5/13.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router'

export default class FilterPanel extends Component {
    constructor(props) {
        super(props);
        /*attribute*/
        this.filterPanel = false;
    }

    componentDidMount() {
        $(".panel-tools").on('click', ".btn-close", function () {
            var panel = $(this).closest('.panel'), tools = $(this).closest('.panel-tools');
            var confirmGroup = $('<div class="pt-confirm-group">' + '<div class=" btn-group btn-group-justified">' + '<a class="btn btn-inverse close-confirm" href="javascript:void(0)" data-confirm="accept">确认</a>' + '<a class="btn btn-theme btn-close" href="javascript:void(0)">取消</a>' + '</div>' + '</div>');
            var blockClose = $('<div class="blockerClose">');
            tools.toggleClass("push-in");
            if (tools.hasClass("push-in")) {
                tools.append(confirmGroup);
                panel.toggleClass("push-in");
                blockClose.appendTo("#content");
                blockClose.css({"height": $("#content").outerHeight()}).fadeTo(400, 0.5);
            } else {
                $(".blockerClose").fadeOut(200, function () {
                    $(this).remove()
                });
                setTimeout(function () {
                    tools.find(".pt-confirm-group").remove();
                    panel.toggleClass("push-in");
                }, 500);
            }
        });
        $(".panel-tools").on('click', '.close-confirm', function () {
            $(this).closest('.panel').fadeOut(500, function () {
                $(this).remove();
                $(".blockerClose").fadeOut(200, function () {
                    $(this).remove()
                });
            });
        });
    }

    _expand(type) {
        this.filterPanel = type != "up";
        this.props._startRefresh();
    }

    render() {
        const {conditions, sortColumn, sortRule}=this.props;
        var cons = [];
        var column = "";
        var rule = "";
        conditions.forEach(function (val, key) {
            cons.push(<span key={key} style={{color: "black"}}><strong>{val.key}</strong> <em>{val.value}</em></span>);
        });
        column = sortColumn ? <span style={{color: "black"}}><strong>{sortColumn}</strong></span> : "";
        rule = sortColumn ? <span style={{color: "black"}}><strong>{sortRule}</strong></span> : "";
        return (
            <section className="panel"
                     style={{display: conditions.length == 0 && !sortColumn ? "none" : "block", marginBottom: "2px"}}>
                <div className="panel-tools fully color bg-lightseagreen-darken pull-right">
                    <ul className="tooltip-area">
                        <li onClick={this._expand.bind(this, "down")} style={{display: !this.filterPanel ? "table-cell" : "none"}}><a href="javascript:void(0)"
                                                                         className="btn btn-default" title=""
                                                                         data-original-title="展开条件"
                                                                         style={{fontSize: "12px", color: "lightgray"}}>展开</a>
                        </li>
                        <li onClick={this._expand.bind(this, "up")} style={{display: this.filterPanel ? "table-cell" : "none"}}><a href="javascript:void(0)"
                                                                       className="btn btn-default" title=""
                                                                       data-original-title="收起条件" style={{
                            fontSize: "12px",
                            color: "lightgray"
                        }}>收起</a>
                        </li>
                        <li><a href="javascript:void(0)" className="btn btn-close" title="" data-original-title="Close"><i
                            className="fa fa-times"></i></a></li>
                    </ul>
                </div>
                <header id="filterHeader" className="panel-heading no-borders"
                        style={{display: this.filterPanel ? "block" : "none"}}>
                    <div className="mail-title">
                        <section>
                            <span className="label bg-primary"
                                  style={{display: conditions.length == 0 ? "none" : "inline-block"}}>过滤条件</span>
                            {cons}
                            <br />
                            <span className="label bg-primary"
                                  style={{display: !sortColumn ? "none" : "inline-block"}}>排序规则</span>
                            {column}
                            {rule}
                        </section>
                    </div>
                </header>
                <header id="filterCollpase" className="panel-heading no-borders"
                        style={{height: "37px", display: !this.filterPanel ? "block" : "none"}}>
                    <div className="mail-title" style={{marginTop: "-17px"}}>
                        <section>
                            <span className="label bg-primary"
                                  style={{display: conditions.length == 0 ? "none" : "inline-block"}}>过滤条件</span>
                            {cons}
                            <span className="label bg-primary"
                                  style={{display: !sortColumn ? "none" : "inline-block"}}>排序规则</span>
                            {column}
                            {rule}
                        </section>
                    </div>
                </header>
            </section>
        )
    }
}