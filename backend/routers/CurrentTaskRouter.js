/**
 * Created by Captain on 2017/5/14.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var router = express();
var User = require("../models/User");
var CurrentTask = require("../models/CurrentTask");
var HistoryTask = require("../models/HistoryTask");
var BaseService = require("../service/BaseService");

router.post('/currentTasks', function (req, resp) {
    var data = req.body;
    console.log(data);
    data.page = parseInt(data.page);
    data.pageSize = parseInt(data.pageSize);
    BaseService._findAndCountAll(resp,CurrentTask,data);
});

router.post('/currentTask/register', function (req, resp) {
    var data = req.body;
    console.log(data);
    BaseService._register(resp,CurrentTask,data);
});

router.post('/currentTask/update/:id', function (req, resp) {
    var id = req.params.id;
    var data = req.body;
    console.log(req.params);
    BaseService._update(resp,CurrentTask,data,id);
});

router.post('/currentTask/delete', function (req, resp) {
    var data = req.body;
    var ids = JSON.parse(data.ids);
    BaseService._findByIds(resp,CurrentTask,ids,function (results) {
        for(var obj of results){
            var count = 0;
            var saveObj = obj.dataValues;
            saveObj.admin_id = data.admin_id;
            saveObj.real_deal_date = new Date();
            var params = {task_status:0};
            if(obj.status == 1){
                params.task_status = 2;
            }
            BaseService._register(resp,HistoryTask,saveObj,function (result) {
                count++;
                if(count == 2*results.length){
                    BaseService._delete(resp,CurrentTask,ids);
                }
            });
            BaseService._update(resp,User,params,saveObj.user_id,function (result) {
                count++;
                if(count == 2*results.length){
                    BaseService._delete(resp,CurrentTask,ids);
                }
            });
        }
    });
});

module.exports = router;