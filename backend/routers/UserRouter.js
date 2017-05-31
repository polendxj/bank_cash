/**
 * Created by Captain on 2017/5/13.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var router = express();
var multiparty = require('multiparty');
var fs = require('fs');
var nodemailer = require('nodemailer');
var frameworkUtils = require('../frameworkHelper/frameworkUtils');
var User = require("../models/User");
var HistoryTask = require("../models/HistoryTask");
var UserService = require("../service/UserService");
var BaseService = require("../service/BaseService");

router.post('/users', function (req, resp) {
    var data = frameworkUtils.JSONStrToObj(req.body);
    if ((data.page||data.page==0) && data.pageSize) {
        data.page = parseInt(data.page);
        data.pageSize = parseInt(data.pageSize);
    } else {
        data.page = 0;
        data.pageSize = 1000;
    }
    UserService._findAndCountAll(resp, User, data);
});

router.post('/user/register', function (req, resp) {
    var data = frameworkUtils.JSONStrToObj(req.body);
    console.log("11",data);
    var id = frameworkUtils.GenerateUUID();
    data.id = id;
    data.delete_status = 1;
    if (data.is_manager == 1) {
        data.manager_id = id;
    }
    data = frameworkUtils.deleteNullKey(data);
    data.renew_fee_status = 0;
    data.flow_record_status = 0;
    data.code_select_status = 0;
    console.log("22",data);
    BaseService._register(resp, User, data,function (result) {
        if(result.result == "SUCCESS"){
            UserService.renewFeeStatus(User);
            UserService.taskStatus(User);
        }else{
            fs.unlink("./uploadImgs/" + data.path);
        }
        resp.send(result);
    });
});

router.post('/user/update/:id', function (req, resp) {
    var id = req.params.id;
    var data = frameworkUtils.JSONStrToObj(req.body);
    if (data.is_manager == 1) {
        data.manager_id = id;
    }
    data = frameworkUtils.deleteNullKey(data);
    BaseService._update(resp, User, data, id);
});

router.post('/user/updateRenewFeeStatus', function (req, resp) {
    var data = frameworkUtils.JSONStrToObj(req.body);
    var ids = data.ids;
    var admin_id = data.admin_id;
    var count = 0;
    for(var id_date of ids){
        (function (id_d) {
            var id = id_d.split("_")[0];
            var plan_renew_fee_date = id_d.split("_")[1];
            var updateParams = {
                renew_fee_status:0,
                renew_fee_date:new Date()
            };
            BaseService._update(resp, User, updateParams, id, function (result) {
                if (result.result == "SUCCESS") {
                    var params = {
                        user_id: id,
                        admin_id: admin_id,
                        status: 3,
                        plan_deal_date: plan_renew_fee_date,
                        real_deal_date: new Date()
                    };
                    BaseService._register(resp, HistoryTask, params,function (res) {
                        if (res.result == "SUCCESS") {
                            count++;
                            if(count == ids.length){
                                resp.send({result:"SUCCESS"});
                            }
                        }else{
                            return resp.send(res);
                        }
                    });
                } else {
                    return resp.send(result);
                }
            });
        })(id_date)
    }
});
router.post('/user/updateFlowRecordStatus', function (req, resp) {
    var data = frameworkUtils.JSONStrToObj(req.body);
    var ids = data.ids;
    var admin_id = data.admin_id;
    var count = 0;
    for(var id_date of ids){
        (function (id_d) {
            var id = id_d.split("_")[0];
            var plan_flow_record_date = id_d.split("_")[1];
            var updateParams = {
                task_status:1,
                flow_record_status:0,
                flow_record_date:data.flow_record_date
            };
            BaseService._update(resp, User, updateParams, id, function (result) {
                if (result.result == "SUCCESS") {
                    var params = {
                        user_id: id,
                        admin_id: admin_id,
                        status: 1,
                        plan_deal_date: plan_flow_record_date,
                        real_deal_date: new Date()
                    };
                    BaseService._register(resp, HistoryTask, params,function (res) {
                        if (res.result == "SUCCESS") {
                            count++;
                            if(count == ids.length){
                                resp.send({result:"SUCCESS"});
                            }
                        }else{
                            return resp.send(res);
                        }
                    });
                } else {
                    return resp.send(result);
                }
            });
        })(id_date)
    }
});
router.post('/user/updateCodeSelectStatus', function (req, resp) {
    var data = frameworkUtils.JSONStrToObj(req.body);
    var ids = data.ids;
    var admin_id = data.admin_id;
    var count = 0;
    for(var id_date of ids) {
        (function (id_d) {
            var id = id_d.split("_")[0];
            var plan_code_select_date = id_d.split("_")[1];
            var updateParams = {
                task_status: 0,
                code_select_status: 0,
                code_select_date: new Date()
            };
            BaseService._update(resp, User, updateParams, id, function (result) {
                if (result.result == "SUCCESS") {
                    var params = {
                        user_id: id,
                        admin_id: admin_id,
                        status: 2,
                        plan_deal_date: plan_code_select_date,
                        real_deal_date: new Date()
                    }
                    BaseService._register(resp, HistoryTask, params,function (res) {
                        if (res.result == "SUCCESS") {
                            count++;
                            if(count == ids.length){
                                resp.send({result:"SUCCESS"});
                            }
                        }else{
                            return resp.send(res);
                        }
                    });
                } else {
                    return resp.send(result);
                }
            });
        })(id_date)
    }
});

router.post('/user/deleteByManager', function (req, resp) {
    var data = frameworkUtils.JSONStrToObj(req.body);
    var managerIds = data.managerIds;
    var params = {delete_status: 0};
    UserService._deleteByManagerIds(resp, User, managerIds, params);
});

router.post('/user/deleteByIds', function (req, resp) {
    var data = frameworkUtils.JSONStrToObj(req.body);
    var ids = data.ids;
    var params = {delete_status: 0};
    UserService._delete(resp, User, ids, params);
});

router.post('/user/findCountInManager', function (req, resp) {
    var data = frameworkUtils.JSONStrToObj(req.body);
    if(data.page&&data.pageSize){
        data.page = parseInt(data.page);
        data.pageSize = parseInt(data.pageSize);
    }else{
        data.page = 0;
        data.pageSize = 1000;
    }
    UserService.findCountInManager(resp,User,data);
});

router.post('/file/uploading', function (req, res, next) {
    var form = new multiparty.Form({uploadDir: './uploadImgs/'});
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);

        if (err) {
            console.log('parse error: ' + err);
            res.send({"result": "FAILURE"});
        } else {
            console.log('parse files: ' + filesTmp);
            console.log(files);
            var inputFile = files.inputFile[0];
            var uploadedPath = inputFile.path;
            var newName = (new Date).getTime() + inputFile.originalFilename.substring(inputFile.originalFilename.indexOf("."));
            var dstPath = './uploadImgs/' + newName;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    console.log('rename error: ' + err);
                } else {
                    console.log('rename ok');
                }
            });
            res.send({"result": "SUCCESS", path: newName});
        }

    });
});

//fs.unlink("./uploadImgs/" + data.path); //删除图片
router.post('/user/sendEmail', function (req, resp) {
    var data = frameworkUtils.JSONStrToObj(req.body);
    var service = data.from_email.split('@')[1].split('.')[0];
    var transporter = nodemailer.createTransport({
        service: service,
        secureConnection: true, // 使用 SSL
        auth: {
            user: data.from_email,
            //这里密码不是qq密码，是你设置的smtp密码
            pass: data.email_password
        }
    });

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: data.from_email, // 发件地址
        to: data.recipient, // 收件列表
        subject: data.subject, // 标题
        //text和html两者只支持一种
        // text: 'Hello world ?', // 标题
        html: data.content // html 内容
    };
    var files = frameworkUtils.JSONStrToObj(data.files);
    if(files.length>0){
        mailOptions.attachments = files;
    }
    console.log(mailOptions.attachments);
// send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log("err",error.response);
            if(error.response){
                resp.send({result : "FAILURE", message : error.response});
            }else{
                resp.send({result : "FAILURE", message : "未知错误"});
            }

        }else{
            console.log('Message sent: ' + info.response);
            var id = data.id;
            var admin_id = data.admin_id;
            var updateParams = {
                task_status:1,
                flow_record_status:0,
                flow_record_date:new Date()
            };
            BaseService._update(resp, User, updateParams, id, function (result) {
                if (result.result == "SUCCESS") {
                    var params = {
                        user_id: id,
                        admin_id: admin_id,
                        status: 1,
                        plan_deal_date: data.plan_deal_date,
                        real_deal_date: new Date()
                    };
                    BaseService._register(resp, HistoryTask, params);
                } else {
                    resp.send(result);
                }
            });
        }
    });
});
module.exports = router;