/**
 * Created by Administrator on 2017/5/13.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router'

export default class BreadCrumb extends Component {
    render() {
        const {titles}=this.props;
        var results = [];
        titles.forEach(function (val, key) {
            results.push(<li key={key}><a href="javascript:void(0)">{val}</a></li>);
        });
        return (
            <ol className="breadcrumb">
                {results}
            </ol>
        )
    }
}