/**
 * Created by Captain on 2017/5/13.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var router = express();
var multiparty = require('multiparty');
var fs = require('fs');
var frameworkUtils = require('../frameworkHelper/frameworkUtils');
var User = require("../models/User");
var HistoryTask = require("../models/HistoryTask");
var UserService = require("../service/UserService");
var BaseService = require("../service/BaseService");

router.post('/users', function (req, resp) {
    var data = frameworkUtils.JSONStrToObj(req.body);
    if (data.page && data.pageSize) {
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
    var id = frameworkUtils.GenerateUUID();
    data.id = id;
    data.delete_status = 1;
    if (data.is_manager == 1) {
        data.manager_id = id;
    }
    data.
    data = frameworkUtils.deleteNullKey(data);
    BaseService._register(resp, User, data);
});

router.post('/user/update/:id', function (req, resp) {
    var id = req.params.id;
    var data = frameworkUtils.JSONStrToObj(req.body);
    console.log(req.params);
    if (data.is_manager == 1) {
        data.manager_id = id;
    }
    data = frameworkUtils.deleteNullKey(data);
    BaseService._update(resp, User, data, id);
});

router.post('/user/updateRenewFeeStatus', function (req, resp) {
    var data = frameworkUtils.JSONStrToObj(req.body);
    var id = data.id;
    var admin_id = data.admin_id;
    delete data.admin_id;
    delete data.id;
    console.log(id);
    BaseService._update(resp, User, data, id, function (result) {
        if (result.result == "SUCCESS") {
            var params = {
                user_id: id,
                admin_id: admin_id,
                status: 3,
                plan_deal_date: data.plan_deal_date,
                real_deal_date: new Date()
            };
            BaseService._register(resp, HistoryTask, params);
        } else {
            resp.send(result);
        }
    });
});
router.post('/user/updateFlowRecordStatus', function (req, resp) {
    var data = frameworkUtils.JSONStrToObj(req.body);
    var id = data.id;
    var admin_id = data.admin_id;
    delete data.admin_id;
    delete data.id;
    BaseService._update(resp, User, data, id, function (result) {
        if (result.result == "SUCCESS") {
            var params = {
                user_id: id,
                admin_id: admin_id,
                status: 1,
                plan_deal_date: data.plan_deal_date,
                real_deal_date: new Date()
            }
            BaseService._register(resp, HistoryTask, params);
        } else {
            resp.send(result);
        }
    });
});
router.post('/user/updateCodeSelectStatus', function (req, resp) {
    var data = frameworkUtils.JSONStrToObj(req.body);
    var id = data.id;
    var admin_id = data.admin_id;
    delete data.admin_id;
    delete data.id;
    BaseService._update(resp, User, data, id, function (result) {
        if (result.result == "SUCCESS") {
            var params = {
                user_id: id,
                admin_id: admin_id,
                status: 2,
                plan_deal_date: data.plan_deal_date,
                real_deal_date: new Date()
            }
            BaseService._register(resp, HistoryTask, params);
        } else {
            resp.send(result);
        }
    });
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
module.exports = router;