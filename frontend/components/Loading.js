/**
 * Created by Administrator on 2017/5/13.
 */
import React, {Component, PropTypes} from 'react'

export default class Loading extends Component {
    render() {
        const {type}=this.props;
        return (
            <div style={{textAlign: "center", position: "absolute", backgroundColor: "white",width:"100%"}}>
                <img src="../assets/images/loading.gif" style={{width: "200px", height: "200px", opacity: "0.8"}}/>
                <div style={{fontSize: "12px",marginTop:"-3px",marginBottom:"20px"}}>数据即将呈现</div>
            </div>
        )
    }
}