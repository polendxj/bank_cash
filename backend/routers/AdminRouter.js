/**
 * Created by Captain on 2017/5/13.
 */
var express = require('express')
var querystring = require('querystring')
var router = express();
var async = require('async');
var Admin = require("../models/Admin");
var BaseService = require("../service/BaseService");

router.post('/admins', function (req, resp) {
    var data = req.body;
    console.log(data);
    data.page = parseInt(data.page);
    data.pageSize = parseInt(data.pageSize);
    BaseService._findAndCountAll(resp,Admin,data);
});

router.post('/admin/register', function (req, resp) {
    var data = req.body;
    console.log(data);
    BaseService._register(resp,Admin,data);
});

router.post('/admin/update/:id', function (req, resp) {
    var id = req.params.id;
    var data = req.body;
    console.log(req.params);
    BaseService._update(resp,Admin,data,id);
});

module.exports = router;