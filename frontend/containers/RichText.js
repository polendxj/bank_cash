/**
 * Created by Captain on 2017/4/10.
 */
import React from 'react';
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
export default class RichText extends React.Component {
    constructor(props) {
        super(props);
        this.editor = "";
    }
    componentDidMount(){
        this.editor = UE.getEditor(this.props.id, {
            //工具栏
            serverUrl : "/ueditor/ue",
            toolbars: [["fullscreen","source","undo","redo","insertunorderedlist","insertorderedlist", "link",
                "unlink","help","attachment","simpleupload","insertimage","emotion","pagebreak","date", "bold",
                "italic","fontborder","strikethrough","underline","forecolor","justifyleft","justifycenter",
                "justifyright","justifyjustify","paragraph","rowspacingbottom","rowspacingtop","lineheight"
            ]],
            lang:"zh-cn" ,
            //字体
            'fontfamily':[
                { label:'',name:'songti',val:'宋体,SimSun'},
                { label:'',name:'kaiti',val:'楷体,楷体_GB2312, SimKai'},
                { label:'',name:'yahei',val:'微软雅黑,Microsoft YaHei'},
                { label:'',name:'heiti',val:'黑体, SimHei'},
                { label:'',name:'lishu',val:'隶书, SimLi'},
                { label:'',name:'andaleMono',val:'andale mono'},
                { label:'',name:'arial',val:'arial, helvetica,sans-serif'},
                { label:'',name:'arialBlack',val:'arial black,avant garde'},
                { label:'',name:'comicSansMs',val:'comic sans ms'},
                { label:'',name:'impact',val:'impact,chicago'},
                { label:'',name:'timesNewRoman',val:'times new roman'}
            ],
            //字号
            'fontsize':[10, 11, 12, 14, 16, 18, 20, 24, 36],
            enableAutoSave : false,
            autoHeightEnabled : false,
            initialFrameHeight: this.props.height,
            initialFrameWidth: '100%',
            readonly:this.props.disabled
        });
        var that = this;
        this.editor.ready(function() {
            var value = that.props.value?that.props.value:'<p></p>';
            console.log("value",that.props.value);
            that.editor.setContent(value);
            that.editor.addListener('afterUpfile', function (t, result) {
                var files = [];
                console.log("result",result);
                for(var i in result){
                    var filename = result[i].title;
                    files[i] = {path:result[i].url,filename:filename};
                    var fileHtml = '<li><a href="'+result[i].url+'" target="_blank">'+filename+'</a></li>';
                    $("#upload_file_wrap").append(fileHtml);
                }
                that.props.getFilePaths(files);
            });
        });
    }
    componentDidUpdate(){
        var that = this;
        this.editor.ready(function() {
            var value = that.props.value?that.props.value:'<p></p>';
            that.editor.setContent(value);
        });
    }
    componentWillUnmount(){
        this.editor = "";
        UE.getEditor("content").destroy();
    }
    render (){
        return (
            <script id={this.props.id} name="content" type="text/plain" />
        )
    }
}
export default RichText;