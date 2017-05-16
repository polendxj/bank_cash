/**
 * Created by Administrator on 2017/5/13.
 */
import React, {Component, PropTypes} from 'react'

export default class NoData extends Component {
    render() {
        const {type}=this.props;
        return (
            <div style={{textAlign: "center", position: "absolute", backgroundColor: "white", width: "100%"}}>
                <div style={{fontSize: "26px", fontWeight: "bold", color: "lightgray", opacity: "0.6",marginTop: "-3px", marginBottom: "20px"}}>无可用数据</div>
            </div>

        )
    }
}