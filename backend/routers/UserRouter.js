/**
 * Created by Captain on 2017/5/13.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var router = express();
var User = require("../models/User");
var UserService = require("../service/UserService");
var BaseService = require("../service/BaseService");

router.post('/users', function (req, resp) {
    var data = req.body;
    console.log(data);
    data.page = parseInt(data.page);
    data.pageSize = parseInt(data.pageSize);
    BaseService._findAndCountAll(resp,User,data);
});

router.post('/usersByManagerId', function (req, resp) {
    var data = req.body;
    console.log(data);
    data.page = parseInt(data.page);
    data.pageSize = parseInt(data.pageSize);
    UserService._findByManagerId(resp,User,data);
});

router.post('/user/register', function (req, resp) {
    var data = req.body;
    data.register_date = new Date();
    console.log(data);
    BaseService._register(resp,User,data);
});

router.post('/user/update/:id', function (req, resp) {
    var id = req.params.id;
    var data = req.body;
    console.log(req.params);
    BaseService._update(resp,User,data,id);
});

router.post('/user/deleteByManager', function (req, resp) {
    var data = req.body;
    var managerIds = JSON.parse(data.managerIds);
    UserService._deleteByManagerIds(resp,User,managerIds);
});

router.post('/user/deleteByIds', function (req, resp) {
    var data = req.body;
    var ids = JSON.parse(data.ids);
    BaseService._delete(resp,User,ids);
});

module.exports = router;