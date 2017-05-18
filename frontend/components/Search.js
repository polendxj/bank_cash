/**
 * Created by Administrator on 2017/5/13.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router'

export default class Search extends Component {
    render() {
        const {type}=this.props;
        var searchType = [
            {title: "会员搜索", content: <div></div>}
        ];
        var result = searchType[type];
        return (
            <div className="widget-top-search">
                    <span className="icon"><a href="#" className="close-header-search"><i
                        className="fa fa-times"></i></a></span>
                <form id="top-search">
                    <h2><strong>{result.title}</strong></h2>
                    <div className="input-group">
                        {result.content}
                    </div>
                </form>
            </div>
        )
    }
}